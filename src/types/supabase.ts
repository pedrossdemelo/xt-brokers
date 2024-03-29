/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/transacoes": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.transacoes.id"];
          codAtivo?: parameters["rowFilter.transacoes.codAtivo"];
          codCliente?: parameters["rowFilter.transacoes.codCliente"];
          data?: parameters["rowFilter.transacoes.data"];
          venda?: parameters["rowFilter.transacoes.venda"];
          valor?: parameters["rowFilter.transacoes.valor"];
          qtdeAtivo?: parameters["rowFilter.transacoes.qtdeAtivo"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["transacoes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** transacoes */
          transacoes?: definitions["transacoes"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.transacoes.id"];
          codAtivo?: parameters["rowFilter.transacoes.codAtivo"];
          codCliente?: parameters["rowFilter.transacoes.codCliente"];
          data?: parameters["rowFilter.transacoes.data"];
          venda?: parameters["rowFilter.transacoes.venda"];
          valor?: parameters["rowFilter.transacoes.valor"];
          qtdeAtivo?: parameters["rowFilter.transacoes.qtdeAtivo"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.transacoes.id"];
          codAtivo?: parameters["rowFilter.transacoes.codAtivo"];
          codCliente?: parameters["rowFilter.transacoes.codCliente"];
          data?: parameters["rowFilter.transacoes.data"];
          venda?: parameters["rowFilter.transacoes.venda"];
          valor?: parameters["rowFilter.transacoes.valor"];
          qtdeAtivo?: parameters["rowFilter.transacoes.qtdeAtivo"];
        };
        body: {
          /** transacoes */
          transacoes?: definitions["transacoes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/clientes": {
    get: {
      parameters: {
        query: {
          codCliente?: parameters["rowFilter.clientes.codCliente"];
          email?: parameters["rowFilter.clientes.email"];
          saldo?: parameters["rowFilter.clientes.saldo"];
          criado?: parameters["rowFilter.clientes.criado"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["clientes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** clientes */
          clientes?: definitions["clientes"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          codCliente?: parameters["rowFilter.clientes.codCliente"];
          email?: parameters["rowFilter.clientes.email"];
          saldo?: parameters["rowFilter.clientes.saldo"];
          criado?: parameters["rowFilter.clientes.criado"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          codCliente?: parameters["rowFilter.clientes.codCliente"];
          email?: parameters["rowFilter.clientes.email"];
          saldo?: parameters["rowFilter.clientes.saldo"];
          criado?: parameters["rowFilter.clientes.criado"];
        };
        body: {
          /** clientes */
          clientes?: definitions["clientes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/clientesInvestimentos": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.clientesInvestimentos.id"];
          codCliente?: parameters["rowFilter.clientesInvestimentos.codCliente"];
          codAtivo?: parameters["rowFilter.clientesInvestimentos.codAtivo"];
          qtdeAtivo?: parameters["rowFilter.clientesInvestimentos.qtdeAtivo"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["clientesInvestimentos"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** clientesInvestimentos */
          clientesInvestimentos?: definitions["clientesInvestimentos"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.clientesInvestimentos.id"];
          codCliente?: parameters["rowFilter.clientesInvestimentos.codCliente"];
          codAtivo?: parameters["rowFilter.clientesInvestimentos.codAtivo"];
          qtdeAtivo?: parameters["rowFilter.clientesInvestimentos.qtdeAtivo"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.clientesInvestimentos.id"];
          codCliente?: parameters["rowFilter.clientesInvestimentos.codCliente"];
          codAtivo?: parameters["rowFilter.clientesInvestimentos.codAtivo"];
          qtdeAtivo?: parameters["rowFilter.clientesInvestimentos.qtdeAtivo"];
        };
        body: {
          /** clientesInvestimentos */
          clientesInvestimentos?: definitions["clientesInvestimentos"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/investimentos": {
    get: {
      parameters: {
        query: {
          codAtivo?: parameters["rowFilter.investimentos.codAtivo"];
          nomeAtivo?: parameters["rowFilter.investimentos.nomeAtivo"];
          valor?: parameters["rowFilter.investimentos.valor"];
          variacao?: parameters["rowFilter.investimentos.variacao"];
          qtdeAtivo?: parameters["rowFilter.investimentos.qtdeAtivo"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["investimentos"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** investimentos */
          investimentos?: definitions["investimentos"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          codAtivo?: parameters["rowFilter.investimentos.codAtivo"];
          nomeAtivo?: parameters["rowFilter.investimentos.nomeAtivo"];
          valor?: parameters["rowFilter.investimentos.valor"];
          variacao?: parameters["rowFilter.investimentos.variacao"];
          qtdeAtivo?: parameters["rowFilter.investimentos.qtdeAtivo"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          codAtivo?: parameters["rowFilter.investimentos.codAtivo"];
          nomeAtivo?: parameters["rowFilter.investimentos.nomeAtivo"];
          valor?: parameters["rowFilter.investimentos.valor"];
          variacao?: parameters["rowFilter.investimentos.variacao"];
          qtdeAtivo?: parameters["rowFilter.investimentos.qtdeAtivo"];
        };
        body: {
          /** investimentos */
          investimentos?: definitions["investimentos"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  transacoes: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: character varying
     * @description Note:
     * This is a Foreign Key to `investimentos.codAtivo`.<fk table='investimentos' column='codAtivo'/>
     */
    codAtivo: string;
    /** Format: uuid */
    codCliente: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    data: string;
    /** Format: boolean */
    venda: boolean;
    /** Format: double precision */
    valor: number;
    /** Format: smallint */
    qtdeAtivo: number;
  };
  clientes: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    codCliente: string;
    /** Format: character varying */
    email: string;
    /** Format: bigint */
    saldo: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    criado: string;
  };
  clientesInvestimentos: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: uuid */
    codCliente: string;
    /**
     * Format: character varying
     * @description Note:
     * This is a Foreign Key to `investimentos.codAtivo`.<fk table='investimentos' column='codAtivo'/>
     */
    codAtivo: string;
    /** Format: smallint */
    qtdeAtivo: number;
  };
  investimentos: {
    /**
     * Format: character varying
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    codAtivo: string;
    /** Format: character varying */
    nomeAtivo: string;
    /** Format: real */
    valor: number;
    /** Format: real */
    variacao: number;
    /** Format: smallint */
    qtdeAtivo: number;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description transacoes */
  "body.transacoes": definitions["transacoes"];
  /** Format: bigint */
  "rowFilter.transacoes.id": string;
  /** Format: character varying */
  "rowFilter.transacoes.codAtivo": string;
  /** Format: uuid */
  "rowFilter.transacoes.codCliente": string;
  /** Format: timestamp with time zone */
  "rowFilter.transacoes.data": string;
  /** Format: boolean */
  "rowFilter.transacoes.venda": string;
  /** Format: double precision */
  "rowFilter.transacoes.valor": string;
  /** Format: smallint */
  "rowFilter.transacoes.qtdeAtivo": string;
  /** @description clientes */
  "body.clientes": definitions["clientes"];
  /** Format: uuid */
  "rowFilter.clientes.codCliente": string;
  /** Format: character varying */
  "rowFilter.clientes.email": string;
  /** Format: bigint */
  "rowFilter.clientes.saldo": string;
  /** Format: timestamp with time zone */
  "rowFilter.clientes.criado": string;
  /** @description clientesInvestimentos */
  "body.clientesInvestimentos": definitions["clientesInvestimentos"];
  /** Format: bigint */
  "rowFilter.clientesInvestimentos.id": string;
  /** Format: uuid */
  "rowFilter.clientesInvestimentos.codCliente": string;
  /** Format: character varying */
  "rowFilter.clientesInvestimentos.codAtivo": string;
  /** Format: smallint */
  "rowFilter.clientesInvestimentos.qtdeAtivo": string;
  /** @description investimentos */
  "body.investimentos": definitions["investimentos"];
  /** Format: character varying */
  "rowFilter.investimentos.codAtivo": string;
  /** Format: character varying */
  "rowFilter.investimentos.nomeAtivo": string;
  /** Format: real */
  "rowFilter.investimentos.valor": string;
  /** Format: real */
  "rowFilter.investimentos.variacao": string;
  /** Format: smallint */
  "rowFilter.investimentos.qtdeAtivo": string;
}

export interface operations {}

export interface external {}
