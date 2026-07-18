export type ValidationExpressionResult =
    | { action: "SHORT_CIRCUIT"; response: any }
    | { action: "NO_OP"; response?: null | undefined };
