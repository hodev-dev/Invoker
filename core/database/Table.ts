import { Column } from "./Column";

class Schema {
  create({ table, columns, timestamps }) {
    var sql = `CREATE TABLE ${table}(
            ${this.generateDatatype(columns)}
            ${","}
            ${this.generatePrimaryKey(columns)}
              ${","}
            ${this.generateUniqueIndex(columns)}
        )`;
    return sql;
  }

  generateUniqueIndex(columns: any) {
    return (
      "UNIQUE INDEX(" +
      this.unique(columns)
        .filter((el) => el !== undefined)
        .join(",") +
      ")"
    );
  }

  generateDatatype(columns: any) {
    return columns.map((column: Column) => {
      return (
        column.name +
        " " +
        column.dataType +
        " " +
        this.unsigned(column) +
        " " +
        this.nullable(column) +
        " " +
        this.autoIncrement(column)
      );
    });
  }

  generatePrimaryKey(columns: any) {
    return columns
      .map((column: Column) => {
        return column.isPrimaryKey
          ? "PRIMARY KEY(" + column.name + ")"
          : undefined;
      })
      .filter((el) => el !== undefined)
      .join(",");
  }

  unique(col: any) {
    var test = col.map((column: Column) => {
      return column.isUniqueIndex ? column.name : undefined;
    });
    if (test !== undefined) {
      return test;
    }
  }

  nullable(col: Column) {
    if (!col.isNullable) {
      return "NOT NULL";
    } else {
      return "NULL";
    }
  }

  autoIncrement(col: Column) {
    if (col.isAutoIncrement) {
      return "AUTO_INCREMENT";
    } else {
      return "";
    }
  }

  unsigned(col: Column) {
    if (col.isUnsigned) {
      return "UNSIGNED";
    } else {
      return "";
    }
  }
}

export { Schema };
