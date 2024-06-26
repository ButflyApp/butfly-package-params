import { describe, expect, it } from "bun:test";
import { prismaQueryParser } from "@/.";

describe('prismaQueryParser', () => {

  it('should return an empty object for an empty input array', () => {
    expect(prismaQueryParser([])).toEqual({});
  });

  it('should correctly parse valid operators', () => {
    const params: any = [
      ["age", ">", 30],
      ["name", "~", "John"],
      ["isActive", "=", true],
      ["score", ">=", 50],
      ["height", "<", 180],
      ["weight", "<=", 75],
      ["status", "!=", "inactive"]
    ];
    const expected = {
      age: { gt: 30 },
      name: { contains: "John" },
      isActive: { equals: true },
      score: { gte: 50 },
      height: { lt: 180 },
      weight: { lte: 75 },
      status: { not: "inactive" }
    };
    expect(prismaQueryParser(params)).toEqual(expected);
  });


  it('should handle with nested fields', () => {
    const params: any = [
      ["profile.age", ">", 30],
      ["profile.name", "~", "John"],
      ["profile.isActive", "=", true],
      ["profile.score", ">=", 50],
      ["profile.height", "<", 180],
      ["profile.weight", "<=", 75],
      ["profile.status", "!=", "inactive"]
    ];
    const expected = {
      profile: {
        age: { gt: 30 },
        name: { contains: "John" },
        isActive: { equals: true },
        score: { gte: 50 },
        height: { lt: 180 },
        weight: { lte: 75 },
        status: { not: "inactive" }
      }
    };
    expect(prismaQueryParser(params)).toEqual(expected);
  })

  it('should handle with in operator', () => {
    const params: any = [
      ["name", "@", ["John", "Michel", "Peter", "Lucian"]]
    ];
    const expected = {
      name: { in: ["John", "Michel", "Peter", "Lucian"] }
    };
    expect(prismaQueryParser(params)).toEqual(expected);
  })
});
