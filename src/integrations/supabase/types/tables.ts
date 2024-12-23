export interface Tables {
  admin_users: {
    Row: {
      created_at: string | null;
      email: string;
      id: string;
    };
    Insert: {
      created_at?: string | null;
      email: string;
      id?: string;
    };
    Update: {
      created_at?: string | null;
      email?: string;
      id?: string;
    };
    Relationships: [];
  };
  vote_opening_notifications: {
    Row: {
      id: string;
      email: string;
      created_at: string | null;
    };
    Insert: {
      id?: string;
      email: string;
      created_at?: string | null;
    };
    Update: {
      id?: string;
      email?: string;
      created_at?: string | null;
    };
    Relationships: [];
  };
  categories: {
    Row: {
      created_at: string | null;
      id: string;
      name: string;
    };
    Insert: {
      created_at?: string | null;
      id?: string;
      name: string;
    };
    Update: {
      created_at?: string | null;
      id?: string;
      name?: string;
    };
    Relationships: [];
  };
  nominees: {
    Row: {
      category_id: string | null;
      created_at: string | null;
      description: string;
      id: string;
      image_url: string | null;
      name: string;
    };
    Insert: {
      category_id?: string | null;
      created_at?: string | null;
      description: string;
      id?: string;
      image_url?: string | null;
      name: string;
    };
    Update: {
      category_id?: string | null;
      created_at?: string | null;
      description?: string;
      id?: string;
      image_url?: string | null;
      name?: string;
    };
    Relationships: [
      {
        foreignKeyName: "nominees_category_id_fkey";
        columns: ["category_id"];
        isOneToOne: false;
        referencedRelation: "categories";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "nominees_category_id_fkey";
        columns: ["category_id"];
        isOneToOne: false;
        referencedRelation: "vote_statistics";
        referencedColumns: ["category_id"];
      },
    ];
  };
  votes: {
    Row: {
      category_id: string | null;
      created_at: string | null;
      email: string;
      id: string;
      nominee_id: string | null;
    };
    Insert: {
      category_id?: string | null;
      created_at?: string | null;
      email: string;
      id?: string;
      nominee_id?: string | null;
    };
    Update: {
      category_id?: string | null;
      created_at?: string | null;
      email?: string;
      id?: string;
      nominee_id?: string | null;
    };
    Relationships: [
      {
        foreignKeyName: "votes_category_id_fkey";
        columns: ["category_id"];
        isOneToOne: false;
        referencedRelation: "categories";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "votes_category_id_fkey";
        columns: ["category_id"];
        isOneToOne: false;
        referencedRelation: "vote_statistics";
        referencedColumns: ["category_id"];
      },
      {
        foreignKeyName: "votes_nominee_id_fkey";
        columns: ["nominee_id"];
        isOneToOne: false;
        referencedRelation: "nominees";
        referencedColumns: ["id"];
      },
      {
        foreignKeyName: "votes_nominee_id_fkey";
        columns: ["nominee_id"];
        isOneToOne: false;
        referencedRelation: "vote_statistics";
        referencedColumns: ["nominee_id"];
      },
    ];
  };
  voting_config: {
    Row: {
      created_at: string | null;
      end_date: string;
      id: string;
      start_date: string;
      updated_at: string | null;
    };
    Insert: {
      created_at?: string | null;
      end_date: string;
      id?: string;
      start_date?: string;
      updated_at?: string | null;
    };
    Update: {
      created_at?: string | null;
      end_date?: string;
      id?: string;
      start_date?: string;
      updated_at?: string | null;
    };
    Relationships: [];
  };
}
