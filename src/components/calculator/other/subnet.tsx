"use client";

import { useMemo, useState } from "react";
import {
  CalcCard,
  Field,
  ResultCard,
  TextInput,
} from "@/components/calculator/CalculatorShell";
import { fmtNum } from "@/lib/format";

// 32-bit ops using BigInt for safety
function ipToInt(ip: string): number | null {
  const parts = ip.trim().split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const oct = parseInt(p, 10);
    if (!/^\d+$/.test(p) || oct < 0 || oct > 255) return null;
    n = (n << 8) | oct;
  }
  // Force unsigned
  return n >>> 0;
}

function intToIp(n: number): string {
  // n is a 32-bit unsigned int; >>> 0 normalizes
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff].join(".");
}

function ipClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return "A";
  if (firstOctet === 127) return "Loopback";
  if (firstOctet >= 128 && firstOctet <= 191) return "B";
  if (firstOctet >= 192 && firstOctet <= 223) return "C";
  if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
  if (firstOctet >= 240 && firstOctet <= 255) return "E (Reserved)";
  return "—";
}

function isPrivate(ipInt: number): boolean {
  const o1 = (ipInt >>> 24) & 0xff;
  const o2 = (ipInt >>> 16) & 0xff;
  if (o1 === 10) return true;
  if (o1 === 172 && o2 >= 16 && o2 <= 31) return true;
  if (o1 === 192 && o2 === 168) return true;
  return false;
}

export default function SubnetCalculator() {
  const [ipStr, setIpStr] = useState<string>("192.168.1.1");
  const [cidrStr, setCidrStr] = useState<string>("24");

  const result = useMemo(() => {
    const ip = ipToInt(ipStr);
    if (ip === null) return { error: "Invalid IPv4 address." } as const;
    const cidr = parseInt(cidrStr, 10);
    if (!/^\d+$/.test(cidrStr.trim()) || cidr < 0 || cidr > 32) {
      return { error: "CIDR must be an integer 0–32." } as const;
    }

    // Build mask with 32-bit math
    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
    const wildcard = (~mask) >>> 0;
    const network = (ip & mask) >>> 0;
    const broadcast = (network | wildcard) >>> 0;

    const firstOctet = (ip >>> 24) & 0xff;
    const cls = ipClass(firstOctet);
    const priv = isPrivate(ip);

    const totalHosts = cidr >= 32 ? 1 : 2 ** (32 - cidr);
    const usableHosts =
      cidr === 32 ? 1 : cidr === 31 ? 2 : Math.max(0, totalHosts - 2);
    // RFC 3021: in /31 networks both addresses are usable hosts.
    // For /32 the single address is the host itself.
    const firstHost = cidr === 32 ? network : cidr === 31 ? network : (network + 1) >>> 0;
    const lastHost = cidr === 32 ? network : cidr === 31 ? broadcast : (broadcast - 1) >>> 0;

    const binaryIp = [(ip >>> 24) & 0xff, (ip >>> 16) & 0xff, (ip >>> 8) & 0xff, ip & 0xff]
      .map((o) => o.toString(2).padStart(8, "0"))
      .join(".");

    return {
      ip,
      mask,
      wildcard,
      network,
      broadcast,
      firstHost,
      lastHost,
      totalHosts,
      usableHosts,
      cls,
      priv,
      cidr,
      binaryIp,
    };
  }, [ipStr, cidrStr]);

  return (
    <div className="space-y-6">
      <CalcCard title="Inputs">
        <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
          <Field label="IP Address (IPv4)">
            <TextInput
              type="text"
              value={ipStr}
              placeholder="192.168.1.1"
              onChange={(e) => setIpStr(e.target.value)}
              className="tabular-nums"
            />
          </Field>
          <Field label="CIDR /">
            <TextInput
              type="number"
              inputMode="numeric"
              min={0}
              max={32}
              value={cidrStr}
              onChange={(e) => setCidrStr(e.target.value)}
              className="tabular-nums"
            />
          </Field>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["10.0.0.1", "8"],
            ["172.16.5.10", "16"],
            ["192.168.0.50", "24"],
            ["203.0.113.7", "28"],
          ].map(([ip, cidr]) => (
            <button
              key={ip + cidr}
              onClick={() => {
                setIpStr(ip);
                setCidrStr(cidr);
              }}
              className="rounded-md border border-brand bg-brand-canvas px-2.5 py-1 text-xs text-brand-muted hover:bg-accent/50 hover:text-brand-ink"
            >
              {ip}/{cidr}
            </button>
          ))}
        </div>
      </CalcCard>

      <CalcCard title="Results">
        {!result ? null : "error" in result ? (
          <p className="text-sm text-red-600">{result.error}</p>
        ) : (
          <div className="space-y-4">
            <ResultCard
              label="Network address"
              value={`${intToIp(result.network)}/${result.cidr}`}
              sub={`IP class ${result.cls}${result.priv ? " · Private" : " · Public"}`}
            />

            <div className="overflow-hidden rounded-lg border border-brand">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-brand-muted">
                    <th className="px-3 py-2">Field</th>
                    <th className="px-3 py-2 text-right tabular-nums">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <Row label="IP address" value={intToIp(result.ip)} />
                  <Row label="Subnet mask" value={intToIp(result.mask)} />
                  <Row label="Wildcard mask" value={intToIp(result.wildcard)} />
                  <Row
                    label="Network"
                    value={`${intToIp(result.network)}/${result.cidr}`}
                  />
                  <Row label="Broadcast address" value={intToIp(result.broadcast)} />
                  <Row
                    label="First usable host"
                    value={intToIp(result.firstHost)}
                  />
                  <Row
                    label="Last usable host"
                    value={intToIp(result.lastHost)}
                  />
                  <Row
                    label="Total hosts"
                    value={fmtNum(result.totalHosts, 0)}
                  />
                  <Row
                    label="Usable hosts"
                    value={fmtNum(result.usableHosts, 0)}
                  />
                  <Row label="IP class" value={result.cls} />
                  <Row
                    label="Scope"
                    value={result.priv ? "Private" : "Public"}
                  />
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-brand bg-brand-canvas p-3">
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-muted">
                IP in binary
              </div>
              <div className="font-mono text-sm text-brand-ink break-all">
                {result.binaryIp}
              </div>
            </div>
          </div>
        )}
      </CalcCard>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-t border-brand">
      <td className="px-3 py-2 text-brand-muted">{label}</td>
      <td className="px-3 py-2 text-right font-semibold tabular-nums text-brand-ink">
        {value}
      </td>
    </tr>
  );
}
