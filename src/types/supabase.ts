export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];
export interface Database {
  public: {
    Tables: {
      applications: {
        Row: {
          context: string | null;
          id: string;
          vector: string | null;
        };
        Insert: {
          context?: string | null;
          id: string;
          vector?: string | null;
        };
        Update: {
          context?: string | null;
          id?: string;
          vector?: string | null;
        };
      };
      canditates: {
        Row: {
          context: string | null;
          id: string;
          vector: string | null;
        };
        Insert: {
          context?: string | null;
          id: string;
          vector?: string | null;
        };
        Update: {
          context?: string | null;
          id?: string;
          vector?: string | null;
        };
      };
      positions: {
        Row: {
          context: string | null;
          id: string;
          vector: string | null;
        };
        Insert: {
          context?: string | null;
          id: string;
          vector?: string | null;
        };
        Update: {
          context?: string | null;
          id?: string;
          vector?: string | null;
        };
      };
      proyectos: {
        Row: {
          context: string | null;
          id: string;
          vector: string | null;
        };
        Insert: {
          context?: string | null;
          id: string;
          vector?: string | null;
        };
        Update: {
          context?: string | null;
          id?: string;
          vector?: string | null;
        };
      };
      recruiters: {
        Row: {
          context: string | null;
          id: string;
          vector: string | null;
        };
        Insert: {
          context?: string | null;
          id: string;
          vector?: string | null;
        };
        Update: {
          context?: string | null;
          id?: string;
          vector?: string | null;
        };
      };
      test_embeddings: {
        Row: {
          id: number;
          value: string | null;
          vector: string | null;
        };
        Insert: {
          id?: number;
          value?: string | null;
          vector?: string | null;
        };
        Update: {
          id?: number;
          value?: string | null;
          vector?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_matches: {
        Args: {
          recruiterid: string;
          proyectid: string;
          positionid: string;
          min_similarity: number;
        };
        Returns: {
          id: string;
          position_similarity: number;
          proyect_similarity: number;
          recruiter_similarity: number;
          similarity: number;
        }[];
      };
      get_matches_test: {
        Args: {
          recruiterid: string;
          proyectid: string;
          positionid: string;
          min_similarity: number;
        };
        Returns: {
          id: string;
          similarity: number;
        }[];
      };
      get_matches_test2: {
        Args: {
          recruiterid: string;
          proyectid: string;
          positionid: string;
          min_similarity: number;
        };
        Returns: {
          id: string;
          position_similarity: number;
          proyect_similarity: number;
          recruiter_similarity: number;
          similarity: number;
        }[];
      };
      ivfflathandler: {
        Args: {
          "": unknown;
        };
        Returns: unknown;
      };
      match_vector:
        | {
            Args: {
              embedding: string;
              match_count: number;
              val: string;
            };
            Returns: {
              id: number;
              value: string;
              similarity: number;
            }[];
          }
        | {
            Args: {
              embedding: string;
              match_count: number;
              val: string;
            };
            Returns: {
              id: number;
              value: string;
              similarity: number;
            }[];
          };
      match_vector_dos:
        | {
            Args: {
              embedding: string;
              match_count: number;
              val: string;
            };
            Returns: {
              id: number;
              value: string;
              similarity: number;
            }[];
          }
        | {
            Args: {
              embedding: string;
              match_count: number;
              val: string;
            };
            Returns: {
              id: number;
              value: string;
              similarity: number;
            }[];
          };
      match_vector_tres: {
        Args: {
          embedding: string;
          match_count: number;
          val: string;
        };
        Returns: {
          id: number;
          value: string;
          similarity: number;
        }[];
      };
      recruiter_applicants_matches: {
        Args: {
          embedding: string;
          match_count: number;
        };
        Returns: {
          id: number;
          value: string;
          similarity: number;
        }[];
      };
      recruiter_applicants_matches2: {
        Args: {
          embedding: string;
          match_count: number;
        };
        Returns: {
          id: string;
          similarity: number;
        }[];
      };
      test_match_vector: {
        Args: {
          embedding: string;
          match_count: number;
          val: string;
        };
        Returns: {
          id: number;
          value: string;
          similarity: number;
        }[];
      };
      vector_avg: {
        Args: {
          "": number[];
        };
        Returns: string;
      };
      vector_dims: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_norm: {
        Args: {
          "": string;
        };
        Returns: number;
      };
      vector_out: {
        Args: {
          "": string;
        };
        Returns: unknown;
      };
      vector_send: {
        Args: {
          "": string;
        };
        Returns: string;
      };
      vector_typmod_in: {
        Args: {
          "": unknown[];
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
