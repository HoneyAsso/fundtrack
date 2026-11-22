import { describe, expect, it } from "vitest";
import { parsePublicEnv } from "@/lib/env";

const validEnv = {
  NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "publishable-key",
};

describe("parsePublicEnv", () => {
  it("returns the two public settings when they are valid", () => {
    expect(parsePublicEnv(validEnv)).toEqual(validEnv);
  });

  it("rejects a missing Supabase URL", () => {
    expect(() =>
      parsePublicEnv({
        ...validEnv,
        NEXT_PUBLIC_SUPABASE_URL: undefined,
      }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_URL/);
  });

  it("rejects a malformed Supabase URL", () => {
    expect(() =>
      parsePublicEnv({
        ...validEnv,
        NEXT_PUBLIC_SUPABASE_URL: "not-a-url",
      }),
    ).toThrow(/NEXT_PUBLIC_SUPABASE_URL/);
  });

  it("does not copy a service-role key into the parsed env", () => {
    const parsed = parsePublicEnv({
      ...validEnv,
      SUPABASE_SERVICE_ROLE_KEY: "secret-service-role",
    });

    expect(parsed).toEqual(validEnv);
    expect(parsed).not.toHaveProperty("SUPABASE_SERVICE_ROLE_KEY");
  });
});
