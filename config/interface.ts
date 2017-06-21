module Interface {
    export interface DBAttrs {
        username: string;
        password: string;
        database: string;
        host: string;
        dialect: string;
    };
    export interface DB {
        development: DBAttrs;
        test: DBAttrs;
        production: DBAttrs;
    };
}
