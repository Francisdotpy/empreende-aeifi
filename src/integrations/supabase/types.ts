export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ConexaoMeiEventoRow = {
  id: boolean;
  data_destaque: string;
  cidade_destaque: string;
  ano_destaque: string;
  local_nome: string;
  local_endereco: string;
  local_complemento: string;
  exibir_local: boolean;
  whatsapp_numero: string;
  whatsapp_mensagem: string;
  whatsapp_ativo: boolean;
  modulos: Json;
  assinante_nome: string;
  assinante_cargo: string;
  coordenador_nome: string;
  coordenador_cargo: string;
  updated_at: string;
};
export type ConexaoMeiEtapaRow = {
  slug: string;
  ordem: number;
  cidade: string;
  rotulo: string;
  data: string;
  local_nome: string;
  endereco: string;
  programacao: string;
  inscricoes_abertas: boolean;
  certificados_liberados: boolean;
  carga_horaria: string;
  updated_at: string;
};
export type ConexaoMeiInscricaoRow = {
  id: string;
  etapa_slug: string;
  nome: string;
  cpf_hash: string;
  cpf_cifrado: string;
  whatsapp: string;
  consentimento_em: string;
  presenca_confirmada: boolean;
  created_at: string;
  updated_at: string;
};
export type ConexaoMeiDocumentoRow = {
  id: string;
  titulo: string;
  tipo: string;
  data_publicacao: string | null;
  arquivo_path: string;
  arquivo_nome: string;
  visivel: boolean;
  created_at: string;
};
export type ConexaoMeiParceiroRow = {
  id: string;
  nome: string;
  categoria: "realizacao" | "parceiro" | "apoio";
  link: string;
  logo_path: string;
  etapa_slug: string | null;
  visivel: boolean;
  created_at: string;
};
export type ConexaoMeiExpositorRow = {
  id: string;
  nome: string;
  segmento: string;
  cidade: string;
  link: string;
  logo_path: string;
  status: "Confirmado" | "Pendente" | "Oculto";
  created_at: string;
};

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      conexao_mei_evento: {
        Row: ConexaoMeiEventoRow;
        Insert: Omit<ConexaoMeiEventoRow, "updated_at"> & { updated_at?: string };
        Update: Partial<ConexaoMeiEventoRow>;
        Relationships: [];
      };
      conexao_mei_etapas: {
        Row: ConexaoMeiEtapaRow;
        Insert: Omit<ConexaoMeiEtapaRow, "updated_at"> & { updated_at?: string };
        Update: Partial<ConexaoMeiEtapaRow>;
        Relationships: [];
      };
      conexao_mei_inscricoes: {
        Row: ConexaoMeiInscricaoRow;
        Insert: Omit<
          ConexaoMeiInscricaoRow,
          "id" | "presenca_confirmada" | "created_at" | "updated_at"
        > &
          Partial<
            Pick<ConexaoMeiInscricaoRow, "id" | "presenca_confirmada" | "created_at" | "updated_at">
          >;
        Update: Partial<ConexaoMeiInscricaoRow>;
        Relationships: [];
      };
      conexao_mei_documentos: {
        Row: ConexaoMeiDocumentoRow;
        Insert: Omit<ConexaoMeiDocumentoRow, "id" | "created_at"> &
          Partial<Pick<ConexaoMeiDocumentoRow, "id" | "created_at">>;
        Update: Partial<ConexaoMeiDocumentoRow>;
        Relationships: [];
      };
      conexao_mei_parceiros: {
        Row: ConexaoMeiParceiroRow;
        Insert: Omit<ConexaoMeiParceiroRow, "id" | "created_at"> &
          Partial<Pick<ConexaoMeiParceiroRow, "id" | "created_at">>;
        Update: Partial<ConexaoMeiParceiroRow>;
        Relationships: [];
      };
      conexao_mei_expositores: {
        Row: ConexaoMeiExpositorRow;
        Insert: Omit<ConexaoMeiExpositorRow, "id" | "created_at"> &
          Partial<Pick<ConexaoMeiExpositorRow, "id" | "created_at">>;
        Update: Partial<ConexaoMeiExpositorRow>;
        Relationships: [];
      };
      conexao_mei_config: {
        Row: { id: boolean; destinatario: string; updated_at: string };
        Insert: { id?: boolean; destinatario: string; updated_at?: string };
        Update: { id?: boolean; destinatario?: string; updated_at?: string };
        Relationships: [];
      };
      conexao_mei_manifestacoes: {
        Row: {
          id: string;
          nome: string;
          empresa: string;
          telefone: string;
          email: string;
          cidade_uf: string;
          modalidade: string;
          mensagem: string;
          destinatario: string;
          status: "pendente" | "enviado" | "falhou";
          resend_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nome: string;
          empresa: string;
          telefone: string;
          email: string;
          cidade_uf: string;
          modalidade: string;
          mensagem: string;
          destinatario: string;
          status?: "pendente" | "enviado" | "falhou";
          resend_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          nome?: string;
          empresa?: string;
          telefone?: string;
          email?: string;
          cidade_uf?: string;
          modalidade?: string;
          mensagem?: string;
          destinatario?: string;
          status?: "pendente" | "enviado" | "falhou";
          resend_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      noticias: {
        Row: {
          capa_url: string;
          categoria: string;
          created_at: string;
          data_noticia: string;
          fontes: string[];
          id: string;
          slug: string;
          status: "publicado" | "rascunho";
          subtitulo: string;
          texto: string;
          titulo: string;
          updated_at: string;
        };
        Insert: {
          capa_url: string;
          categoria: string;
          created_at?: string;
          data_noticia?: string;
          fontes?: string[];
          id?: string;
          slug: string;
          status?: "publicado" | "rascunho";
          subtitulo: string;
          texto: string;
          titulo: string;
          updated_at?: string;
        };
        Update: {
          capa_url?: string;
          categoria?: string;
          created_at?: string;
          data_noticia?: string;
          fontes?: string[];
          id?: string;
          slug?: string;
          status?: "publicado" | "rascunho";
          subtitulo?: string;
          texto?: string;
          titulo?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      downloads_editais: {
        Row: {
          created_at: string;
          data_publicacao: string;
          id: string;
          imagem_url: string;
          pdf_url: string;
          status: "publicado" | "rascunho";
          titulo: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          data_publicacao?: string;
          id?: string;
          imagem_url: string;
          pdf_url: string;
          status?: "publicado" | "rascunho";
          titulo: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          data_publicacao?: string;
          id?: string;
          imagem_url?: string;
          pdf_url?: string;
          status?: "publicado" | "rascunho";
          titulo?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_allowlist: {
        Row: {
          created_at: string;
          email: string;
        };
        Insert: {
          created_at?: string;
          email: string;
        };
        Update: {
          created_at?: string;
          email?: string;
        };
        Relationships: [];
      };
      site_content: {
        Row: {
          key: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value?: string;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      conexao_mei_allow_attempt: {
        Args: { p_scope: string; p_subject_hash: string; p_limit: number };
        Returns: boolean;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const;
