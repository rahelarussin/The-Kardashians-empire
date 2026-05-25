export enum NodeType {
  PERSON = 'person',
  COMPANY = 'company',
  INDUSTRY = 'industry',
  CAUSE = 'cause'
}

export enum RelationType {
  PARENT_OF = 'parent_of',
  PARTNER_OF = 'partner_of',
  FOUNDED_OWNED = 'founded/owned',
  IN_INDUSTRY = 'in_industry',
  ADVOCATES_FOR = 'advocates_for'
}

export interface Node {
  id: string;
  type: NodeType;
  group?: number;
  isKourtneyFamily?: boolean;
  isKourtneyProduct?: boolean;
  isKylieFamily?: boolean;
  isKylieProduct?: boolean;
  isKimFamily?: boolean;
  isKimProduct?: boolean;
  isKendallFamily?: boolean;
  isKendallProduct?: boolean;
  isKhloeFamily?: boolean;
  isKhloeProduct?: boolean;
  isRobFamily?: boolean;
  isRobProduct?: boolean;
  isKris?: boolean;
  isRobert?: boolean;
  isCaitlyn?: boolean;
  isKimHumanitarian?: boolean;
  isKourtneyHumanitarian?: boolean;
  isKhloeHumanitarian?: boolean;
  isKhloeYellow?: boolean;
  isKendallHumanitarian?: boolean;
  isKylieHumanitarian?: boolean;
  isKimLightRed?: boolean;
  isKendallKylie?: boolean;
  isDashGradient?: boolean;
  isKimKylieImpact?: boolean;
  achievements?: {
    industry?: string;
    humanitarian?: string;
    general?: string;
  };
}

export interface Link {
  source: string;
  target: string;
  relation: RelationType;
}

export interface NetworkData {
  nodes: Node[];
  links: Link[];
}

export const DATA: NetworkData = {
  nodes: [
    // People
    { 
      id: "Kris Jenner", 
      type: NodeType.PERSON, 
      isKris: true,
      achievements: {
        industry: "Pionirka reality TV formata i genijalna menadžerica ('momager') koja je pretvorila obiteljski brend u globalno poslovno carstvo vrijedno milijarde dolara. Vodila je pregovore za 'Keeping Up with the Kardashians' i 'The Kardashians' te bila ključni pokretač poslovnih pothvata svojih kćeri.",
        humanitarian: "Aktivno podržava rad dječjih bolnica, donira zakladama za borbu protiv raka, te redovito osigurava resurse i hranu za pučke kuhinje u Los Angelesu.",
        general: "Glava obitelji i arhitektica brenda Kardashian-Jenner."
      }
    },
    { 
      id: "Robert Kardashian", 
      type: NodeType.PERSON, 
      isRobert: true,
      achievements: {
        industry: "Poznati američki odvjetnik i poduzetnik čija je obrana u suđenju stoljeća (O.J. Simpson) utemeljila modernu eru medijske fascinacije pravosuđem i slavnim osobama.",
        humanitarian: "Sudjelovao u osiguravanju pravne pomoći ugroženim skupinama i podržavao dobrotvorne zaklade posvećene zdravlju i obrazovanju.",
        general: "Otac Kourtney, Kim, Khloe i Roba, u čije je sjećanje osnovana Specijalna onkološka klinika Robert G. Kardashian na UCLA."
      }
    },
    { 
      id: "Caitlyn Jenner", 
      type: NodeType.PERSON, 
      isCaitlyn: true,
      achievements: {
        industry: "Osvajačica zlatne olimpijske medalje u desetoboju čiji je sportski uspjeh poslužio kao temelj za desetljeća uspješne televizijske kultne prisutnosti i motivacijskog govorništva.",
        humanitarian: "Jedna od najistaknutijih figura u borbi za prava i vidljivost transrodnih osoba na globalnoj razini, dobitnica nagrade Arthur Ashe Courage Award.",
        general: "Olimpijska legenda i zagovornica LGBTQ+ prava."
      }
    },
    { 
      id: "Kim Kardashian", 
      type: NodeType.PERSON, 
      isKimFamily: true,
      achievements: {
        industry: "Redefinirala je modernu modnu industriju i oblik oblikovanja tijela kroz SKIMS (brend procijenjen na više od 4 milijarde dolara koji je srušio barijere u inkluzivnosti veličina). Također je uvela trendove konturiranja i postavila standarde moderne kozmetike i estetike.",
        humanitarian: "Istaknuta aktivistica za reformu pravosuđa. Surađuje sa zakladom 'Innocence Project', stopostotno financira rad odvjetničkih timova koji su oslobodili desetke nepravedno osuđenih osoba i uspješno lobira za zakonske reforme u Bijeloj kući.",
        general: "Globalni fenomen, poduzetnica i buduća odvjetnica."
      }
    },
    { 
      id: "Kourtney Kardashian", 
      type: NodeType.PERSON, 
      isKourtneyFamily: true,
      achievements: {
        industry: "Predvodnica u promicanju čistog i zdravog načina života (clean lifestyle). Kroz svoj portal Poosh i brend dodataka prehrani Lemme uspješno je spojila wellness industriju s pop-kulturnom estetikom i podigla svijest o ekološkoj kozmetici.",
        humanitarian: "Pionirka u lobiranju pred američkim Kongresom za uvođenje strožih zakona o ispitivanju i regulaciji sastojaka u kozmetičkim proizvodima, štiteći zdravlje potrošača.",
        general: "Strastvena zagovornica zdravog života i wellness ikona."
      }
    },
    { 
      id: "Khloe Kardashian", 
      type: NodeType.PERSON, 
      isKhloeFamily: true,
      achievements: {
        industry: "Suosnivačica modne marke Good American, koja je revolucionirala modnu maloprodaju zahtijevajući da sve veličine budu izložene zajedno, čime je postala globalni simbol 'body positivity' pokreta.",
        humanitarian: "Redovito donira dječjim bolnicama širom SAD-a, pokreće i financira kampanje protiv zlostavljanja na internetu (cyberbullying) te se bori za žensko osnaživanje.",
        general: "Poduzetnica pod sloganom 'Good American' i promotorica inkluzivnosti tijela."
      }
    },
    { 
      id: "Rob Kardashian", 
      type: NodeType.PERSON, 
      isRobFamily: true,
      achievements: {
        industry: "Osnivač brenda šaljivih i luksuznih čarapa 'Arthur George' i brendova hrane, pokazujući da se obiteljski poduzetnički duh može primijeniti i na kreativne modne niše.",
        humanitarian: "Podržava i sudjeluje u obiteljskim inicijativama za donacije dječjim bolnicama i medicinskim istraživanjima.",
        general: "Dizajner čarapa i sin obitelji Kardashian."
      }
    },
    { 
      id: "Kendall Jenner", 
      type: NodeType.PERSON, 
      isKendallFamily: true,
      achievements: {
        industry: "Jedan od najplaćenijih svjetskih supermodela visoke mode. Samostalno je osnovala brend '818 Tequila' koji je osvojio brojne nagrade za održivost i kvalitetu, te podigao standarde eko-svjesne proizvodnje u Meksiku.",
        humanitarian: "Aktivna ambasadorica i donatorica neprofitne organizacije 'charity: water' za osiguravanje pitke vode u zemljama u razvoju, te sponzorira dječje onkološke odjele.",
        general: "Ikona svjetske mode i uspješna poduzetnica."
      }
    },
    { 
      id: "Kylie Jenner", 
      type: NodeType.PERSON, 
      isKylieFamily: true,
      achievements: {
        industry: "Prepoznana kao najmlađa 'self-made' milijarderka u povijesti od strane Forbesa zahvaljujući brendu Kylie Cosmetics. Samostalno je kreirala koncept izravne prodaje putem društvenih mreža i oblikovala moderni koncept influencer-marketinga.",
        humanitarian: "Glavna ambasadorica organizacije 'Smile Train' kojoj donira dio profita od prodaje za financiranje besplatnih operacija rascjepa usne i nepca za djecu diljem svijeta, te velika donatorica organizacije Teen Cancer America.",
        general: "Ikona estetske industrije i osnivačica carstva Kylie Cosmetics."
      }
    },
    { id: "Kanye West", type: NodeType.PERSON, isKylieFamily: false, isKimFamily: true },
    { id: "Travis Scott", type: NodeType.PERSON, isKylieFamily: true },
    { id: "Tristan Thompson", type: NodeType.PERSON, isKhloeFamily: true },
    { id: "Scott Disick", type: NodeType.PERSON, isKourtneyFamily: true },
    { id: "Travis Barker", type: NodeType.PERSON, isKourtneyFamily: true },
    { id: "Blac Chyna", type: NodeType.PERSON, isRobFamily: true },
    { id: "Dream Kardashian", type: NodeType.PERSON, isRobFamily: true },
    { id: "Stormi Webster", type: NodeType.PERSON, isKylieFamily: true },
    { id: "Mason Disick", type: NodeType.PERSON, isKourtneyFamily: true },
    { id: "Penelope Disick", type: NodeType.PERSON, isKourtneyFamily: true },
    { id: "Reign Disick", type: NodeType.PERSON, isKourtneyFamily: true },
    { id: "Rocky Barker", type: NodeType.PERSON, isKourtneyFamily: true },
    { id: "Aire Webster", type: NodeType.PERSON, isKylieFamily: true },
    { id: "True Thompson", type: NodeType.PERSON, isKhloeFamily: true },
    { id: "Tatum Thompson", type: NodeType.PERSON, isKhloeFamily: true },
    { id: "North West", type: NodeType.PERSON, isKimFamily: true },
    { id: "Saint West", type: NodeType.PERSON, isKimFamily: true },
    { id: "Chicago West", type: NodeType.PERSON, isKimFamily: true },
    { id: "Psalm West", type: NodeType.PERSON, isKimFamily: true },
    { id: "Kris Humphries", type: NodeType.PERSON, isKimFamily: true },
    // Companies
    { id: "SKIMS", type: NodeType.COMPANY, isKimProduct: true },
    { id: "SKKN by Kim", type: NodeType.COMPANY, isKimProduct: true },
    { id: "KKW Beauty", type: NodeType.COMPANY, isKimProduct: true },
    { id: "KKW Fragrance", type: NodeType.COMPANY, isKimProduct: true, isKimLightRed: true },
    { id: "Kim Kardashian: Hollywood", type: NodeType.COMPANY, isKimProduct: true },
    { id: "Kimoji", type: NodeType.COMPANY, isKimProduct: true, isKimLightRed: true },
    { id: "Kylie Cosmetics", type: NodeType.COMPANY, isKylieProduct: true },
    { id: "Kylie Skin", type: NodeType.COMPANY, isKylieProduct: true },
    { id: "Kylie Baby", type: NodeType.COMPANY, isKylieProduct: true },
    { id: "Good American", type: NodeType.COMPANY, isKhloeProduct: true },
    { id: "The Khloe Kardashian Podcast", type: NodeType.COMPANY, isKhloeProduct: true, isKhloeYellow: true },
    { id: "Safely", type: NodeType.COMPANY, isKhloeProduct: true, isKhloeYellow: true },
    { id: "Khloud", type: NodeType.COMPANY, isKhloeProduct: true, isKhloeYellow: true },
    { id: "Poosh", type: NodeType.COMPANY, isKourtneyProduct: true },
    { id: "Lemme", type: NodeType.COMPANY, isKourtneyProduct: true },
    { id: "818 Tequila", type: NodeType.COMPANY, isKendallProduct: true },
    { id: "Kendall + Kylie", type: NodeType.COMPANY, isKendallKylie: true },
    { id: "Arthur George", type: NodeType.COMPANY, isRobProduct: true },
    { id: "DASH", type: NodeType.COMPANY, isDashGradient: true },
    { id: "The Kardashians (Hulu)", type: NodeType.COMPANY, isKris: true },
    // Industries
    { id: "Fashion", type: NodeType.INDUSTRY },
    { id: "Beauty", type: NodeType.INDUSTRY },
    { id: "Skincare", type: NodeType.INDUSTRY },
    { id: "Media/Reality TV", type: NodeType.INDUSTRY },
    { id: "Beverages", type: NodeType.INDUSTRY },
    { id: "Lifestyle", type: NodeType.INDUSTRY },
    // Humanitarian & Advocacy (Kim's Causes)
    { id: "Innocence Project", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Cut50", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Children's Hospital Los Angeles", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Make-A-Wish Foundation", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Reforma pravosuđa", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Donacije za prirodne katastrofe", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Pomoć tijekom COVID-19", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Podrška beskućnicima", type: NodeType.CAUSE, isKimHumanitarian: true },
    { id: "Mentalno zdravlje i obrazovanje", type: NodeType.CAUSE, isKimHumanitarian: true },
    // Kourtney's Health & Wellness Advocacy
    { id: "Inicijative za zdravlje i wellness", type: NodeType.CAUSE, isKourtneyHumanitarian: true },
    { id: "Podrška dječjim organizacijama", type: NodeType.CAUSE, isKourtneyHumanitarian: true },
    { id: "Kampanje za zdrav način života", type: NodeType.CAUSE, isKourtneyHumanitarian: true },
    // Khloé's Advocacy
    { id: "Podrška ženama (body positivity)", type: NodeType.CAUSE, isKhloeHumanitarian: true },
    { id: "Donacije dječjim bolnicama", type: NodeType.CAUSE, isKhloeHumanitarian: true },
    { id: "Kampanje protiv bullyinga", type: NodeType.CAUSE, isKhloeHumanitarian: true },
    // Kendall's Advocacy
    { id: "charity: water", type: NodeType.CAUSE, isKendallHumanitarian: true },
    { id: "UCLA Children's Hospital", type: NodeType.CAUSE, isKendallHumanitarian: true },
    { id: "donacije za čistu vodu", type: NodeType.CAUSE, isKendallHumanitarian: true },
    { id: "podrška dječjim bolnicama", type: NodeType.CAUSE, isKendallHumanitarian: true },
    // Kylie's Advocacy
    { id: "Smile Train", type: NodeType.CAUSE, isKylieHumanitarian: true },
    { id: "Teen Cancer America", type: NodeType.CAUSE, isKylieHumanitarian: true },
    { id: "donacije bolnicama", type: NodeType.CAUSE, isKylieHumanitarian: true },
    { id: "pomoć djeci i mladima", type: NodeType.CAUSE, isKylieHumanitarian: true },
    // Kim & Kylie Impact
    { id: "Standardi ljepote (konturiranje, “Instagram look”)", type: NodeType.CAUSE, isKimKylieImpact: true },
    { id: "Društvene mreže i influencer kulturu", type: NodeType.CAUSE, isKimKylieImpact: true },
    { id: "Modu (streetwear + luksuz mix)", type: NodeType.CAUSE, isKimKylieImpact: true },
    { id: "Body positivity i inkluzivnost (npr. SKIMS veličine)", type: NodeType.CAUSE, isKimKylieImpact: true },
    { id: "Reality TV kao globalni fenomen", type: NodeType.CAUSE, isKimKylieImpact: true }
  ],
  links: [
    // Roditelji i djeca
    { source: "Kris Jenner", target: "Kim Kardashian", relation: RelationType.PARENT_OF },
    { source: "Kris Jenner", target: "Kourtney Kardashian", relation: RelationType.PARENT_OF },
    { source: "Kris Jenner", target: "Khloe Kardashian", relation: RelationType.PARENT_OF },
    { source: "Kris Jenner", target: "Rob Kardashian", relation: RelationType.PARENT_OF },
    { source: "Kris Jenner", target: "Kendall Jenner", relation: RelationType.PARENT_OF },
    { source: "Kris Jenner", target: "Kylie Jenner", relation: RelationType.PARENT_OF },
    { source: "Robert Kardashian", target: "Kim Kardashian", relation: RelationType.PARENT_OF },
    { source: "Robert Kardashian", target: "Kourtney Kardashian", relation: RelationType.PARENT_OF },
    { source: "Robert Kardashian", target: "Khloe Kardashian", relation: RelationType.PARENT_OF },
    { source: "Robert Kardashian", target: "Rob Kardashian", relation: RelationType.PARENT_OF },
    { source: "Caitlyn Jenner", target: "Kendall Jenner", relation: RelationType.PARENT_OF },
    { source: "Caitlyn Jenner", target: "Kylie Jenner", relation: RelationType.PARENT_OF },
    { source: "Kim Kardashian", target: "North West", relation: RelationType.PARENT_OF },
    { source: "Kim Kardashian", target: "Saint West", relation: RelationType.PARENT_OF },
    { source: "Kim Kardashian", target: "Chicago West", relation: RelationType.PARENT_OF },
    { source: "Kim Kardashian", target: "Psalm West", relation: RelationType.PARENT_OF },
    { source: "Kanye West", target: "North West", relation: RelationType.PARENT_OF },
    { source: "Kanye West", target: "Saint West", relation: RelationType.PARENT_OF },
    { source: "Kanye West", target: "Chicago West", relation: RelationType.PARENT_OF },
    { source: "Kanye West", target: "Psalm West", relation: RelationType.PARENT_OF },
    { source: "Kylie Jenner", target: "Stormi Webster", relation: RelationType.PARENT_OF },
    { source: "Kylie Jenner", target: "Aire Webster", relation: RelationType.PARENT_OF },
    { source: "Rob Kardashian", target: "Dream Kardashian", relation: RelationType.PARENT_OF },
    { source: "Blac Chyna", target: "Dream Kardashian", relation: RelationType.PARENT_OF },
    { source: "Khloe Kardashian", target: "True Thompson", relation: RelationType.PARENT_OF },
    { source: "Khloe Kardashian", target: "Tatum Thompson", relation: RelationType.PARENT_OF },
    { source: "Tristan Thompson", target: "True Thompson", relation: RelationType.PARENT_OF },
    { source: "Tristan Thompson", target: "Tatum Thompson", relation: RelationType.PARENT_OF },
    { source: "Kourtney Kardashian", target: "Mason Disick", relation: RelationType.PARENT_OF },
    { source: "Kourtney Kardashian", target: "Penelope Disick", relation: RelationType.PARENT_OF },
    { source: "Kourtney Kardashian", target: "Reign Disick", relation: RelationType.PARENT_OF },
    { source: "Kourtney Kardashian", target: "Rocky Barker", relation: RelationType.PARENT_OF },
    { source: "Travis Barker", target: "Rocky Barker", relation: RelationType.PARENT_OF },
    // Ljubavnici / Partneri
    { source: "Kris Jenner", target: "Robert Kardashian", relation: RelationType.PARTNER_OF },
    { source: "Kris Jenner", target: "Caitlyn Jenner", relation: RelationType.PARTNER_OF },
    { source: "Kim Kardashian", target: "Kanye West", relation: RelationType.PARTNER_OF },
    { source: "Kim Kardashian", target: "Kris Humphries", relation: RelationType.PARTNER_OF },
    { source: "Kylie Jenner", target: "Travis Scott", relation: RelationType.PARTNER_OF },
    { source: "Khloe Kardashian", target: "Tristan Thompson", relation: RelationType.PARTNER_OF },
    { source: "Kourtney Kardashian", target: "Scott Disick", relation: RelationType.PARTNER_OF },
    { source: "Kourtney Kardashian", target: "Travis Barker", relation: RelationType.PARTNER_OF },
    { source: "Rob Kardashian", target: "Blac Chyna", relation: RelationType.PARTNER_OF },
    // Kompanije i vlasništvo
    { source: "Kim Kardashian", target: "SKIMS", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "SKKN by Kim", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "KKW Beauty", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "KKW Fragrance", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "Kim Kardashian: Hollywood", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "Kimoji", relation: RelationType.FOUNDED_OWNED },
    { source: "Kylie Jenner", target: "Kylie Cosmetics", relation: RelationType.FOUNDED_OWNED },
    { source: "Kylie Jenner", target: "Kylie Skin", relation: RelationType.FOUNDED_OWNED },
    { source: "Kylie Jenner", target: "Kylie Baby", relation: RelationType.FOUNDED_OWNED },
    { source: "Khloe Kardashian", target: "Good American", relation: RelationType.FOUNDED_OWNED },
    { source: "Khloe Kardashian", target: "The Khloe Kardashian Podcast", relation: RelationType.FOUNDED_OWNED },
    { source: "Khloe Kardashian", target: "Safely", relation: RelationType.FOUNDED_OWNED },
    { source: "Khloe Kardashian", target: "Khloud", relation: RelationType.FOUNDED_OWNED },
    { source: "Kourtney Kardashian", target: "Poosh", relation: RelationType.FOUNDED_OWNED },
    { source: "Kourtney Kardashian", target: "Lemme", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "DASH", relation: RelationType.FOUNDED_OWNED },
    { source: "Khloe Kardashian", target: "DASH", relation: RelationType.FOUNDED_OWNED },
    { source: "Kourtney Kardashian", target: "DASH", relation: RelationType.FOUNDED_OWNED },
    { source: "Kendall Jenner", target: "818 Tequila", relation: RelationType.FOUNDED_OWNED },
    { source: "Kendall Jenner", target: "Kendall + Kylie", relation: RelationType.FOUNDED_OWNED },
    { source: "Kylie Jenner", target: "Kendall + Kylie", relation: RelationType.FOUNDED_OWNED },
    { source: "Rob Kardashian", target: "Arthur George", relation: RelationType.FOUNDED_OWNED },
    { source: "Kris Jenner", target: "Kylie Cosmetics", relation: RelationType.FOUNDED_OWNED },
    // Industrije
    { source: "SKIMS", target: "Fashion", relation: RelationType.IN_INDUSTRY },
    { source: "Good American", target: "Fashion", relation: RelationType.IN_INDUSTRY },
    { source: "DASH", target: "Fashion", relation: RelationType.IN_INDUSTRY },
    { source: "Kendall + Kylie", target: "Fashion", relation: RelationType.IN_INDUSTRY },
    { source: "KKW Beauty", target: "Beauty", relation: RelationType.IN_INDUSTRY },
    { source: "Kylie Cosmetics", target: "Beauty", relation: RelationType.IN_INDUSTRY },
    { source: "SKKN by Kim", target: "Skincare", relation: RelationType.IN_INDUSTRY },
    { source: "Kylie Skin", target: "Skincare", relation: RelationType.IN_INDUSTRY },
    { source: "Poosh", target: "Lifestyle", relation: RelationType.IN_INDUSTRY },
    { source: "Lemme", target: "Lifestyle", relation: RelationType.IN_INDUSTRY },
    { source: "The Khloe Kardashian Podcast", target: "Media/Reality TV", relation: RelationType.IN_INDUSTRY },
    { source: "Safely", target: "Lifestyle", relation: RelationType.IN_INDUSTRY },
    { source: "Khloud", target: "Lifestyle", relation: RelationType.IN_INDUSTRY },
    { source: "818 Tequila", target: "Beverages", relation: RelationType.IN_INDUSTRY },
    { source: "Kris Jenner", target: "Media/Reality TV", relation: RelationType.IN_INDUSTRY },
    { source: "Kris Jenner", target: "The Kardashians (Hulu)", relation: RelationType.FOUNDED_OWNED },
    { source: "Kim Kardashian", target: "Media/Reality TV", relation: RelationType.IN_INDUSTRY },
    // Kim's Humanitarian Links
    { source: "Kim Kardashian", target: "Innocence Project", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Cut50", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Children's Hospital Los Angeles", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Make-A-Wish Foundation", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Reforma pravosuđa", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Donacije za prirodne katastrofe", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Pomoć tijekom COVID-19", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Podrška beskućnicima", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Mentalno zdravlje i obrazovanje", relation: RelationType.ADVOCATES_FOR },
    // Kourtney's Advocacy Links
    { source: "Kourtney Kardashian", target: "Inicijative za zdravlje i wellness", relation: RelationType.ADVOCATES_FOR },
    { source: "Kourtney Kardashian", target: "Podrška dječjim organizacijama", relation: RelationType.ADVOCATES_FOR },
    { source: "Kourtney Kardashian", target: "Kampanje za zdrav način života", relation: RelationType.ADVOCATES_FOR },
    // Khloé's Advocacy Links
    { source: "Khloe Kardashian", target: "Podrška ženama (body positivity)", relation: RelationType.ADVOCATES_FOR },
    { source: "Khloe Kardashian", target: "Donacije dječjim bolnicama", relation: RelationType.ADVOCATES_FOR },
    { source: "Khloe Kardashian", target: "Kampanje protiv bullyinga", relation: RelationType.ADVOCATES_FOR },
    // Kendall's Advocacy Links
    { source: "Kendall Jenner", target: "charity: water", relation: RelationType.ADVOCATES_FOR },
    { source: "Kendall Jenner", target: "UCLA Children's Hospital", relation: RelationType.ADVOCATES_FOR },
    { source: "Kendall Jenner", target: "donacije za čistu vodu", relation: RelationType.ADVOCATES_FOR },
    { source: "Kendall Jenner", target: "podrška dječjim bolnicama", relation: RelationType.ADVOCATES_FOR },
    // Kylie's Advocacy Links
    { source: "Kylie Jenner", target: "Smile Train", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "Teen Cancer America", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "donacije bolnicama", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "pomoć djeci i mladima", relation: RelationType.ADVOCATES_FOR },
    // Kim & Kylie Impact Links
    { source: "Kim Kardashian", target: "Standardi ljepote (konturiranje, “Instagram look”)", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Društvene mreže i influencer kulturu", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Modu (streetwear + luksuz mix)", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Body positivity i inkluzivnost (npr. SKIMS veličine)", relation: RelationType.ADVOCATES_FOR },
    { source: "Kim Kardashian", target: "Reality TV kao globalni fenomen", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "Standardi ljepote (konturiranje, “Instagram look”)", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "Društvene mreže i influencer kulturu", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "Modu (streetwear + luksuz mix)", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "Body positivity i inkluzivnost (npr. SKIMS veličine)", relation: RelationType.ADVOCATES_FOR },
    { source: "Kylie Jenner", target: "Reality TV kao globalni fenomen", relation: RelationType.ADVOCATES_FOR }
  ]
};
