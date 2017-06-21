const privilege: any = {
    S: ["superuser", "admin"],
    A: ["superuser", "admin", "lender", "borrower"],
    L: ["lender"],
    B: ["borrower"]
};

export = privilege;
