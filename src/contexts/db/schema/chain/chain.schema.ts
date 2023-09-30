import {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  toTypedRxJsonSchema,
} from 'rxdb';

export const ChainSchema = toTypedRxJsonSchema({
  title: 'chain',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 36,
    },
    chainId: {
      type: 'integer',
      multipleOf: 1,
      minimum: 0,
      maximum: Infinity,
    },
    name: {
      type: 'string',
      maxLength: 100,
    },
    shortName: {
      type: 'string'
    },
    rpc: {
      type: 'array',
      items: {
        "type": "string",
      }
    },
    infoUrl: {
      type: 'string'
    },
    icon: {
      type: 'string',
    },
    faucets: {
      type: 'array',
      items: {
        "type": "string",
      }
    },
    nativeCurrency: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        symbol: {
          type: 'string',
        },
        decimals: {
          type: 'number',
        },
      },
      required: [
        'name',
        'symbol',
        'decimals',
      ] as const
    },
    ens: {
      type: 'object',
      properties: {
        registry: {
          type: 'string',
        },
      },
      required: [
        'name',
        'symbol',
        'decimals',
      ] as const
    },
    explorers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          url: {
            type: 'string',
          },
          standard: {
            type: 'string',
          },
        },
        required: [
          'name',
          'url',
          'standard',
        ] as const
      },
    },
  },
  indexes: ['chainId', 'name'],
  required: [
    'id',
    'name',
    'shortName',
    'nativeCurrency',
    'infoUrl',
    'rpc',
  ] as const
} as const);

export type ChainDocType = ExtractDocumentTypeFromTypedRxJsonSchema<typeof ChainSchema>;
