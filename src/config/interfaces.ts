export interface AccountInformation {
  id: string;
  name: string;
  age: number;
  world: number;
  guilds: string[];
  guildLeader: string[];
  created: string;
  access: string[];
  commander: boolean;
  fractalLevel: number;
  dailyAp: number;
  monthlyAp: number;
  wvwRank: number;
}

export interface WorldInformation {
  id: number;
  name: string;
  population: "Low" | "Medium" | "High" | "VeryHigh" | "Full";
}

export interface GuildInformation {
  id: string;
  name: string;
  tag: string;
  emblem: {
    background: {
      id: number;
    };
    foreground: {
      id: number;
    };
  };
}