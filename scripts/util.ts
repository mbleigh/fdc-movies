/**
 * Utility functions for generating deterministic UUIDs
 * Based on the UUID v5 (SHA-1) algorithm
 */

import { createHash } from 'crypto';

// Standard UUID namespaces
export const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
export const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';

/**
 * Converts various input types to a Buffer
 */
const convertToBuffer = (bytes: string | Buffer | number[]): Buffer => {
  if (Array.isArray(bytes)) {
    return Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    return Buffer.from(bytes, 'utf8');
  }
  return bytes;
};

/**
 * Converts a UUID string to an array of bytes
 */
function uuidToBytes(uuid: string): number[] {
  const bytes: number[] = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, (hex) => {
    bytes.push(parseInt(hex, 16));
    return '';
  });
  return bytes;
}

/**
 * Hex lookup table for byte to hex conversion
 */
const hex: string[] = [];
for (let i = 0; i < 256; i++) {
  hex[i] = (i < 16 ? '0' : '') + i.toString(16);
}

/**
 * Converts a hex string to an array of bytes
 */
function hexToBytes(hexStr: string): number[] {
  const bytes: number[] = [];
  for (let c = 0; c < hexStr.length; c += 2) {
    bytes.push(parseInt(hexStr.substr(c, 2), 16));
  }
  return bytes;
}

/**
 * Class for generating deterministic UUIDs
 */
class UuidHash {
  private version: number;
  private namespace: string | number[];
  private shasum: ReturnType<typeof createHash>;

  constructor(namespace = URL, version = 0x50) {
    this.version = version;
    this.namespace = namespace;

    this.shasum = createHash('sha1');
    this.shasum.update(convertToBuffer(this.namespace));

    if (typeof this.namespace === 'string') {
      this.namespace = uuidToBytes(this.namespace);
    }

    if (!Array.isArray(this.namespace) || this.namespace.length !== 16) {
      throw new Error(
        'namespace must be uuid string or an Array of 16 byte values'
      );
    }
  }

  update(chunk: string | Buffer | number[]): this {
    this.shasum.update(convertToBuffer(chunk));
    return this;
  }

  digest(): string {
    const r = hexToBytes(this.shasum.digest('hex'));
    r[6] = (r[6] & 0x0f) | this.version;
    r[8] = (r[8] & 0x3f) | 0x80;
    
    return (
      hex[r[0]] +
      hex[r[1]] +
      hex[r[2]] +
      hex[r[3]] +
      '-' +
      hex[r[4]] +
      hex[r[5]] +
      '-' +
      hex[r[6]] +
      hex[r[7]] +
      '-' +
      hex[r[8]] +
      hex[r[9]] +
      '-' +
      hex[r[10]] +
      hex[r[11]] +
      hex[r[12]] +
      hex[r[13]] +
      hex[r[14]] +
      hex[r[15]]
    );
  }
}

/**
 * Creates a new UuidHash instance
 */
export function createUuidHash(namespace = URL, version = 0x50): UuidHash {
  return new UuidHash(namespace, version);
}

/**
 * Generates a deterministic UUID based on the input string
 * Uses the URL namespace by default
 */
export function deterministicUuid(input: string, namespace = URL): string {
  return createUuidHash(namespace).update(input).digest();
}

export default UuidHash;
