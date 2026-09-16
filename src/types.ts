export interface ImageUris {
    small: string;
    normal: string;
    large: string;
    art_crop: string;
  }
  
  // Cartas de duas faces (ex: Modal DFCs) não têm image_uris no topo;
  // cada face carrega as suas próprias.
  export interface CardFace {
    name: string;
    mana_cost?: string;
    type_line?: string;
    oracle_text?: string;
    image_uris?: ImageUris;
  }
  
  export interface Card {
    id: string;
    name: string;
    mana_cost?: string;
    type_line?: string;
    oracle_text?: string;
    set_name: string;
    rarity: string;
    colors?: string[];
    image_uris?: ImageUris;
    card_faces?: CardFace[];
    prices?: {
      usd?: string | null;
      eur?: string | null;
    };
  }
  
  export interface CardSearchResponse {
    total_cards: number;
    has_more: boolean;
    data: Card[];
  }