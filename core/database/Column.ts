class Column {

    constructor(name: string) {
        this.name = name;
    }

    name: string;
    testType: any | undefined = undefined;
    dataType: any | undefined = undefined;
    referenceTableName: string | undefined = undefined;
    referenceColumnName: string | undefined = undefined;

    isAutoIncrement: boolean = false;
    isZeroFill: boolean = false;
    isUnsigned: boolean = false;
    isIndex: boolean = false;
    isPrimaryKey: boolean = false;
    isForeign: boolean = false;
    isUniqueIndex: boolean = false;
    isNullable: boolean = false;
    isBinaryKey: boolean = false;

    nullable() {
        this.isNullable = true;
        return this;
    }
    unsigned() {
        this.isUnsigned = true;
        return this;
    }
    indexKey() {
        this.isIndex = true;
        return this;
    }
    primaryKey() {
        this.isPrimaryKey = true;
        return this;
    }
    zeroFill() {
        this.isZeroFill = true;
        return this;
    }
    autoIncrement() {
        this.isAutoIncrement = true;
        return this;
    }
    unique() {
        this.isUniqueIndex = true;
        return this;
    }
    binary() {
        this.isBinaryKey = true;
        return this;
    }
    boolean() {
        this.dataType = "TINYINT(1)";
        return this;
    }
    tinyInteger() {
        this.dataType = "TINYINT";
        return this;
    };
    smalInteger() {
        this.dataType = "SMALLINT";
        return this;
    }
    mediumInteger() {
        this.dataType = "MEDIUMINT";
        return this;
    }
    integer() {
        this.dataType = "INT";
        return this;
    };
    bigInteger() {
        this.dataType = "BIGINT";
        return this;
    }
    char(num?: number) {
        this.dataType = `CHAR(${num})`;
        return this;
    };
    string(num: number) {
        this.dataType = `VARCHAR(${num})`;
        return this;
    };
    text() {
        this.dataType = "TEXT";
        return this;
    };
    mediumText() {
        this.dataType = "MEDIUMTEXT";
        return this;
    };
    longText() {
        this.dataType = "LONGTEXT";
        return this;
    };
    foreign() {
        this.isForeign = true;
        return this;
    }
    references(name: string) {
        this.referenceColumnName = name;
        return this;
    }
    onTable(name: string) {
        this.referenceTableName = name;
        return this;
    }
    onDelete() {
        return this;
    }
    onUpdate() {
        return this;
    }
};

export { Column };
