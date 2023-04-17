export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      proyectos: {
        Row: {
          id: string
          idOrg: string | null
          vector: string | null
        }
        Insert: {
          id: string
          idOrg?: string | null
          vector?: string | null
        }
        Update: {
          id?: string
          idOrg?: string | null
          vector?: string | null
        }
      }
      test_embeddings: {
        Row: {
          id: number
          value: string | null
          vector: string | null
        }
        Insert: {
          id?: number
          value?: string | null
          vector?: string | null
        }
        Update: {
          id?: number
          value?: string | null
          vector?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_vector:
        | {
            Args: {
              embedding: string
              match_count: number
              val: string
            }
            Returns: {
              id: number
              value: string
              similarity: number
            }[]
          }
        | {
            Args: {
              embedding: string
              match_count: number
              val: string
            }
            Returns: {
              id: number
              value: string
              similarity: number
            }[]
          }
      match_vector_dos:
        | {
            Args: {
              embedding: string
              match_count: number
              val: string
            }
            Returns: {
              id: number
              value: string
              similarity: number
            }[]
          }
        | {
            Args: {
              embedding: string
              match_count: number
              val: string
            }
            Returns: {
              id: number
              value: string
              similarity: number
            }[]
          }
      match_vector_tres: {
        Args: {
          embedding: string
          match_count: number
          val: string
        }
        Returns: {
          id: number
          value: string
          similarity: number
        }[]
      }
      test_match_vector: {
        Args: {
          embedding: string
          match_count: number
          val: string
        }
        Returns: {
          id: number
          value: string
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
