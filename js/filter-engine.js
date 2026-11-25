import EZ_JSON from "../data/easy-mode-groups.json" with {type:"json"};
/* Oathfilter filter engine: game data, BOFILTER encode/decode, rule matching, drop simulation, presets and Easy Mode generation.
   Moved unchanged from the former single index.html; only the module boundary (exports and setters) was added. */
const DATA={"bases":[["agate_amulet","Agate Amulet"],["amber_amulet","Amber Amulet"],["amethyst_ring","Amethyst Ring"],["idol_ancestor","Ancestor Idol"],["silk_boots_6","Archon Boots"],["silk_helm_6","Archon Crown"],["silk_gloves_6","Archon Gloves"],["silk_chest_6","Archon Vestment"],["shield_12","Archon Ward"],["sword1h_2","Arming Sword"],["ash_silk_helm_6","Ashen Archon Crown"],["ash_silk_chest_6","Ashen Archon Vestment"],["ash_shield_12","Ashen Archon Ward"],["ash_tome_5","Ashen Astral Codex"],["ash_silk_helm_7","Ashen Astral Diadem"],["ash_silk_chest_7","Ashen Astral Robe"],["ash_staff_7","Ashen Astral Staff"],["ash_shield_13","Ashen Bastion Shield"],["ash_sword1h_7","Ashen Crescent Blade"],["ash_chain_helm_5","Ashen Crusader Helm"],["ash_chain_chest_5","Ashen Crusader Mail"],["ash_mace1h_6","Ashen Crusader's Star"],["ash_scythe_7","Ashen Deathless Reaper"],["ash_greataxe_7","Ashen Doom Axe"],["ash_axe1h_8","Ashen Doom Hatchet"],["ash_brigandine_chest_7","Ashen Dragonscale Coat"],["ash_brigandine_helm_7","Ashen Dragonscale Helm"],["ash_greatmace_6","Ashen Dread Hammer"],["ash_staff_6","Ashen Eclipse Staff"],["ash_claw_7","Ashen Eclipse Talons"],["ash_axe1h_6","Ashen Elven Axe"],["ash_brigandine_chest_6","Ashen General's Brigandine"],["ash_brigandine_helm_6","Ashen General's Helm"],["ash_dagger_6","Ashen Ghost Knife"],["ash_scythe_6","Ashen Gloom Scythe"],["ash_greatmace_5","Ashen Great Mace"],["ash_claw_6","Ashen Gutting Claws"],["ash_chain_helm_6","Ashen Hallowed Helm"],["ash_chain_chest_6","Ashen Hallowed Mail"],["ash_mace1h_8","Ashen Heaven's Anvil"],["ash_ritual_helm_5","Ashen Hexweave Diadem"],["ash_ritual_chest_5","Ashen Hexweave Garb"],["ash_greatsword_12","Ashen Highland Claymore"],["ash_axe1h_7","Ashen Jarl's Axe"],["ash_sword1h_8","Ashen Kensei Blade"],["ash_brigandine_chest_5","Ashen Marshal's Brigandine"],["ash_brigandine_helm_5","Ashen Marshal's Helm"],["ash_staff_5","Ashen Moon Staff"],["ash_wand_6","Ashen Moon Wand"],["ash_bow_7","Ashen Moonlit Bow"],["ash_fist_5","Ashen Night Knuckles"],["ash_dagger_7","Ashen Nightfang"],["ash_leather_helm_6","Ashen Nightstalker Circlet"],["ash_leather_chest_6","Ashen Nightstalker Garb"],["ash_greatsword_6","Ashen Oathkeeper Blade"],["ash_plate_helm_6","Ashen Oathkeeper Helm"],["ash_plate_chest_6","Ashen Oathkeeper Plate"],["ash_shield_14","Ashen Phantom Buckler"],["ash_leather_helm_7","Ashen Phantom Circlet"],["ash_leather_chest_7","Ashen Phantom Coat"],["ash_silk_helm_5","Ashen Sage's Crown"],["ash_silk_chest_5","Ashen Sage's Robe"],["ash_chain_helm_7","Ashen Seraph Helm"],["ash_chain_chest_7","Ashen Seraph Mail"],["ash_shield_15","Ashen Seraph Ward"],["ash_greatmace_7","Ashen Siege Maul"],["ash_greataxe_6","Ashen Hewing Axe"],["ash_bow_9","Ashen Starfall Bow"],["ash_sword1h_9","Ashen Storm Edge"],["ash_staff_14","Ashen Storm Staff"],["ash_bow_8","Ashen Stormwing Bow"],["ash_mace1h_7","Ashen Sunforged Mace"],["ash_greatsword_7","Ashen Titan Edge"],["ash_plate_helm_7","Ashen Titan Greathelm"],["ash_plate_chest_7","Ashen Titan Plate"],["ash_staff_15","Ashen Void Staff"],["ash_wand_7","Ashen Void Wand"],["ash_fist_6","Ashen Voidfists"],["ash_ritual_helm_7","Ashen Voidweave Diadem"],["ash_ritual_chest_7","Ashen Voidweave Garb"],["ash_dagger_8","Ashen Vowcutter"],["ash_greatsword_5","Ashen Warden Blade"],["ash_plate_helm_5","Ashen Warden Helm"],["ash_plate_chest_5","Ashen Warden Plate"],["ash_leather_helm_5","Ashen Wildwood Circlet"],["ash_leather_chest_5","Ashen Wildwood Garb"],["ash_ritual_helm_6","Ashen Witchweave Diadem"],["ash_ritual_chest_6","Ashen Witchweave Robe"],["ash_shield_11","Ashen Wyrmscale Buckler"],["bow_2","Ashwood Shortbow"],["staff_9","Ashwood Staff"],["tome_5","Astral Codex"],["silk_helm_7","Astral Diadem"],["silk_gloves_7","Astral Gloves"],["silk_chest_7","Astral Robe"],["silk_boots_7","Astral Slippers"],["staff_7","Astral Staff"],["ritual_helm_9","Augur's Band"],["ritual_boots_9","Augur's Boots"],["ritual_chest_9","Augur's Wrap"],["ritual_gloves_9","Augur's Wraps"],["plate_helm_2","Barbute"],["greatsword_10","Bastard Sword"],["mace1h_5","Bastion Hammer"],["maceshield_5","Bastion Hammer (Old Pair)"],["shield_13","Bastion Shield"],["greataxe_2","Bearded Axe"],["axe1h_2","Bearded Hatchet"],["staff_8","Birch Staff"],["wand_1","Birch Wand"],["shield_1","Blackiron Shield"],["bloodbound_girdle","Bloodbound Girdle"],["bloodstone_ring","Bloodstone Ring"],["ritual_helm_8","Bone Band"],["ritual_boots_8","Bone Boots"],["scythe_4","Bone Reaper"],["staff_11","Bone Staff"],["bone_talisman","Bone Talisman"],["wand_2","Bone Wand"],["ritual_chest_8","Bone Wrap"],["ritual_gloves_8","Bone Wraps"],["leather_helm_8","Braided Band"],["fist_3","Brawler's Fists"],["brigandine_boots_2","Brigand Boots"],["brigandine_gloves_2","Brigand Gloves"],["brigandine_helm_2","Brigand Helm"],["brigandine_chest_2","Brigandine"],["greataxe_3","Broad Axe"],["broadhead_quiver","Broadhead Quiver"],["chain_belt","Chain Belt"],["chain_boots_1","Chain Boots"],["chain_helm_1","Chain Coif"],["chain_gloves_1","Chain Gloves"],["chain_chest_1","Chain Shirt"],["chain_boots_3","Chainmail Boots"],["chain_gloves_3","Chainmail Gloves"],["chain_chest_3","Chainmail Hauberk"],["chain_helm_3","Chainmail Helm"],["silk_helm_8","Chapel Circlet"],["silk_gloves_8","Chapel Gloves"],["silk_chest_8","Chapel Robe"],["silk_boots_8","Chapel Shoes"],["shield_3","Chapel Ward"],["chain_boots_9","Chaplain's Boots"],["chain_helm_9","Chaplain's Coif"],["chain_gloves_9","Chaplain's Gloves"],["chain_chest_9","Chaplain's Mail"],["idol_chisel","Chisel Idol"],["cinderstone_ring","Cinderstone Ring"],["citrine_amulet","Citrine Amulet"],["tome_4","Codex of Storms"],["gm_cogwheel_ring","Cogwheel Ring"],["copper_band","Copper Band"],["silk_helm_1","Copper Circlet"],["coral_amulet","Coral Amulet"],["ct_rime_silk_boots_6","Core Touched Archon Boots"],["ct_hex_silk_helm_6","Core Touched Archon Crown"],["ct_malice_silk_gloves_6","Core Touched Archon Gloves"],["ct_aegis_silk_chest_6","Core Touched Archon Vestment"],["ct_lore_tome_5","Core Touched Astral Codex"],["ct_hex_silk_helm_7","Core Touched Astral Diadem"],["ct_malice_silk_gloves_7","Core Touched Astral Gloves"],["ct_aegis_silk_chest_7","Core Touched Astral Robe"],["ct_rime_silk_boots_7","Core Touched Astral Slippers"],["ct_gems_staff_7","Core Touched Astral Staff"],["ct_totem_bloodbound_girdle","Core Touched Bloodbound Girdle"],["ct_poison_bloodstone_ring","Core Touched Bloodstone Ring"],["ct_lore_tome_4","Core Touched Codex of Storms"],["ct_reap_scythe_7","Core Touched Deathless Reaper"],["ct_reave_greataxe_7","Core Touched Doom Axe"],["ct_cleave_axe1h_8","Core Touched Doom Hatchet"],["ct_thrift_brigandine_boots_7","Core Touched Dragonscale Boots"],["ct_brawn_brigandine_chest_7","Core Touched Dragonscale Coat"],["ct_quarry_brigandine_gloves_7","Core Touched Dragonscale Gloves"],["ct_frenzy_brigandine_helm_7","Core Touched Dragonscale Helm"],["ct_quake_greatmace_6","Core Touched Dread Hammer"],["ct_rend_claw_7","Core Touched Eclipse Talons"],["ct_thrift_brigandine_boots_6","Core Touched General's Boots"],["ct_brawn_brigandine_chest_6","Core Touched General's Brigandine"],["ct_quarry_brigandine_gloves_6","Core Touched General's Gloves"],["ct_frenzy_brigandine_helm_6","Core Touched General's Helm"],["ct_reap_scythe_6","Core Touched Gloom Scythe"],["ct_rend_claw_6","Core Touched Gutting Claws"],["ct_wellspring_chain_boots_6","Core Touched Hallowed Boots"],["ct_standard_chain_gloves_6","Core Touched Hallowed Gloves"],["ct_vigil_chain_helm_6","Core Touched Hallowed Helm"],["ct_mercy_chain_chest_6","Core Touched Hallowed Mail"],["ct_tremor_mace1h_8","Core Touched Heaven's Anvil"],["ct_cleave_axe1h_7","Core Touched Jarl's Axe"],["ct_duel_sword1h_8","Core Touched Kensei Blade"],["ct_chain_wand_6","Core Touched Moon Wand"],["ct_knuckle_fist_5","Core Touched Night Knuckles"],["ct_venom_dagger_7","Core Touched Nightfang"],["ct_trapnet_leather_boots_6","Core Touched Nightstalker Boots"],["ct_linger_leather_helm_6","Core Touched Nightstalker Circlet"],["ct_veil_leather_chest_6","Core Touched Nightstalker Garb"],["ct_traps_leather_gloves_6","Core Touched Nightstalker Gloves"],["ct_sunder_greatsword_6","Core Touched Oathkeeper Blade"],["ct_bulwark_plate_gloves_6","Core Touched Oathkeeper Gauntlets"],["ct_march_plate_boots_6","Core Touched Oathkeeper Greaves"],["ct_warcry_plate_helm_6","Core Touched Oathkeeper Helm"],["ct_bastion_plate_chest_6","Core Touched Oathkeeper Plate"],["ct_rampart_shield_14","Core Touched Phantom Buckler"],["ct_linger_leather_helm_7","Core Touched Phantom Circlet"],["ct_veil_leather_chest_7","Core Touched Phantom Coat"],["ct_traps_leather_gloves_7","Core Touched Phantom Grips"],["ct_trapnet_leather_boots_7","Core Touched Phantom Treads"],["ct_poison_prismatic_ring","Core Touched Prismatic Ring"],["ct_wellspring_chain_boots_7","Core Touched Seraph Boots"],["ct_standard_chain_gloves_7","Core Touched Seraph Gloves"],["ct_vigil_chain_helm_7","Core Touched Seraph Helm"],["ct_mercy_chain_chest_7","Core Touched Seraph Mail"],["ct_rampart_shield_15","Core Touched Seraph Ward"],["ct_quake_greatmace_7","Core Touched Siege Maul"],["ct_reave_greataxe_6","Core Touched Hewing Axe"],["ct_proj_bow_9","Core Touched Starfall Bow"],["ct_duel_sword1h_9","Core Touched Storm Edge"],["ct_volley_stormfeather_quiver","Core Touched Stormfeather Quiver"],["ct_proj_bow_8","Core Touched Stormwing Bow"],["ct_tremor_mace1h_7","Core Touched Sunforged Mace"],["ct_minion_sunstone_amulet","Core Touched Sunstone Amulet"],["ct_minion_emberglow_amulet","Core Touched Emberglow Amulet"],["ct_sunder_greatsword_7","Core Touched Titan Edge"],["ct_bulwark_plate_gloves_7","Core Touched Titan Gauntlets"],["ct_warcry_plate_helm_7","Core Touched Titan Greathelm"],["ct_march_plate_boots_7","Core Touched Titan Greaves"],["ct_bastion_plate_chest_7","Core Touched Titan Plate"],["ct_totem_vanguard_belt","Core Touched Vanguard Belt"],["ct_gems_staff_15","Core Touched Void Staff"],["ct_chain_wand_7","Core Touched Void Wand"],["ct_knuckle_fist_6","Core Touched Voidfists"],["ct_bough_ritual_boots_7","Core Touched Voidweave Boots"],["ct_storm_ritual_helm_7","Core Touched Voidweave Diadem"],["ct_hourglass_ritual_chest_7","Core Touched Voidweave Garb"],["ct_frost_ritual_gloves_7","Core Touched Voidweave Wraps"],["ct_volley_volley_quiver","Core Touched Volley Quiver"],["ct_venom_dagger_8","Core Touched Vowcutter"],["ct_bough_ritual_boots_6","Core Touched Witchweave Boots"],["ct_storm_ritual_helm_6","Core Touched Witchweave Diadem"],["ct_hourglass_ritual_chest_6","Core Touched Witchweave Robe"],["ct_frost_ritual_gloves_6","Core Touched Witchweave Wraps"],["sword1h_7","Crescent Blade"],["blades_6","Crescent Pair (Old Pair)"],["chain_boots_5","Crusader Boots"],["chain_gloves_5","Crusader Gloves"],["chain_helm_5","Crusader Helm"],["chain_chest_5","Crusader Mail"],["mace1h_6","Crusader's Star"],["maceshield_6","Crusader's Star (Old Pair)"],["scythe_3","Crypt Scythe"],["crystal_belt","Crystal Belt"],["wand_3","Crystal Wand"],["mace1h_4","Dawnbreaker"],["maceshield_4","Dawnbreaker (Old Pair)"],["scythe_7","Deathless Reaper"],["diamond_ring","Diamond Ring"],["greataxe_7","Doom Axe"],["axe1h_8","Doom Hatchet"],["brigandine_boots_7","Dragonscale Boots"],["brigandine_chest_7","Dragonscale Coat"],["brigandine_gloves_7","Dragonscale Gloves"],["brigandine_helm_7","Dragonscale Helm"],["greatmace_6","Dread Hammer"],["staff_1","Driftwood Staff"],["duskstone_amulet","Duskstone Amulet"],["dwarven_rune","Dwarven Rune"],["staff_6","Eclipse Staff"],["claw_7","Eclipse Talons"],["axe1h_6","Elven Axe"],["shield_5","Elven Buckler"],["dagger_3","Elven Dirk"],["sword1h_6","Elven Sabre"],["bow_6","Elven Warbow"],["staff_13","Ember Staff"],["emberglow_amulet","Emberglow Amulet"],["silk_gloves_9","Embroidered Gloves"],["silk_chest_9","Embroidered Robe"],["silk_boots_9","Embroidered Slippers"],["gm_escapement","Escapement Amulet"],["greatsword_11","Executioner's Blade"],["brigandine_chest_3","Field Lamellar"],["fletchers_quiver","Fletcher's Quiver"],["gm_flywheel_belt","Flywheel Belt"],["garnet_ring","Garnet Ring"],["brigandine_boots_6","General's Boots"],["brigandine_chest_6","General's Brigandine"],["brigandine_gloves_6","General's Gloves"],["brigandine_helm_6","General's Helm"],["dagger_6","Ghost Knife"],["scythe_6","Gloom Scythe"],["rune_dagger_2","Glyph Athame"],["staff_2","Gnarled Staff"],["scythe_1","Gravedigger's Scythe"],["greatmace_5","Great Mace"],["scythe_5","Grim Scythe"],["tome_3","Grimoire"],["claw_6","Gutting Claws"],["chain_boots_6","Hallowed Boots"],["chain_gloves_6","Hallowed Gloves"],["chain_helm_6","Hallowed Helm"],["chain_chest_6","Hallowed Mail"],["axe1h_1","Hatchet"],["heartblood_ring","Heartblood Ring"],["shield_4","Heater Shield"],["mace1h_8","Heaven's Anvil"],["maceshield_8","Heaven's Anvil (Old Pair)"],["heavy_belt","Heavy Belt"],["ritual_boots_5","Hexweave Boots"],["ritual_helm_5","Hexweave Diadem"],["ritual_chest_5","Hexweave Garb"],["ritual_gloves_5","Hexweave Wraps"],["shield_2","Hide Buckler"],["greatsword_12","Highland Claymore"],["gm_hoarder_locket","Hoarder's Locket"],["leather_boots_2","Hunter Boots"],["leather_gloves_2","Hunter Gloves"],["leather_helm_2","Hunter's Band"],["bow_1","Hunter's Bow"],["hunters_quiver","Hunter's Quiver"],["leather_chest_2","Hunter's Vest"],["tome_2","Hymnal"],["idol_ingot","Ingot Idol"],["plate_helm_1","Iron Cap"],["plate_gloves_1","Iron Gauntlets"],["greatsword_2","Iron Greatsword"],["plate_boots_1","Iron Greaves"],["plate_chest_2","Iron Hauberk"],["fist_1","Iron Knuckles"],["greatmace_2","Iron Maul"],["iron_ring","Iron Ring"],["claw_1","Iron Talons"],["ironwarden_girdle","Ironwarden Girdle"],["jade_amulet","Jade Amulet"],["fist_4","Jade Gauntlets"],["axe1h_7","Jarl's Axe"],["sword1h_8","Kensei Blade"],["blades_7","Kensei Blades (Old Pair)"],["shield_7","Kite Shield"],["plate_gloves_3","Knight's Gauntlets"],["greatsword_3","Knight's Greatsword"],["plate_boots_3","Knight's Greaves"],["plate_helm_3","Knight's Helm"],["plate_chest_3","Knight's Plate"],["dagger_5","Kris"],["brigandine_boots_3","Lamellar Boots"],["brigandine_gloves_3","Lamellar Gloves"],["brigandine_helm_3","Lamellar Helm"],["lapis_amulet","Lapis Amulet"],["leather_helm_1","Leather Band"],["leather_belt","Leather Belt"],["gm_mainspring_ring","Mainspring Ring"],["brigandine_boots_5","Marshal's Boots"],["brigandine_chest_5","Marshal's Brigandine"],["brigandine_gloves_5","Marshal's Gloves"],["brigandine_helm_5","Marshal's Helm"],["greatsword_8","Militia Greatsword"],["staff_5","Moon Staff"],["wand_6","Moon Wand"],["dagger_4","Moonfang"],["sword1h_3","Moonlit Blade"],["bow_7","Moonlit Bow"],["blades_3","Moonlit Pair (Old Pair)"],["silk_helm_9","Moonsilver Circlet"],["moonsilver_ring","Moonsilver Ring"],["moonstone_amulet","Moonstone Amulet"],["greatmace_3","Morning Star"],["ritual_helm_2","Mystic Band"],["ritual_boots_2","Mystic Boots"],["seer_pendant","Mystic Pendant"],["ritual_chest_2","Mystic Wrap"],["ritual_gloves_2","Mystic Wraps"],["fist_5","Night Knuckles"],["dagger_7","Nightfang"],["leather_boots_6","Nightstalker Boots"],["leather_helm_6","Nightstalker Circlet"],["leather_chest_6","Nightstalker Garb"],["leather_gloves_6","Nightstalker Gloves"],["oathbound_girdle","Oathbound Girdle"],["greatsword_6","Oathkeeper Blade"],["plate_gloves_6","Oathkeeper Gauntlets"],["plate_boots_6","Oathkeeper Greaves"],["plate_helm_6","Oathkeeper Helm"],["mace1h_2","Oathkeeper Mace"],["maceshield_2","Oathkeeper Mace (Old Pair)"],["plate_chest_6","Oathkeeper Plate"],["ritual_boots_4","Occultist Boots"],["ritual_helm_4","Occultist Diadem"],["ritual_chest_4","Occultist Wrap"],["ritual_gloves_4","Occultist Wraps"],["onyx_amulet","Onyx Amulet"],["stormglass_ring","Opaline Ring"],["ritual_boots_1","Padded Boots"],["ritual_chest_1","Padded Wrap"],["ritual_gloves_1","Padded Wraps"],["chain_boots_8","Patched Boots"],["chain_helm_8","Patched Coif"],["chain_chest_8","Patched Mail"],["chain_gloves_8","Patched Mitts"],["shield_10","Pavise"],["pearl_ring","Pearl Ring"],["idol_pebble","Pebble Idol"],["shield_14","Phantom Buckler"],["leather_helm_7","Phantom Circlet"],["leather_chest_7","Phantom Coat"],["leather_gloves_7","Phantom Grips"],["leather_boots_7","Phantom Treads"],["idol_pick","Pick Idol"],["idol_pillar","Pillar Idol"],["plate_chest_1","Plate Vest"],["plate_gloves_2","Plated Gauntlets"],["plate_boots_2","Plated Greaves"],["tome_1","Primer"],["prismatic_ring","Prismatic Ring"],["staff_3","Quarterstaff"],["axe1h_3","Raider's Axe"],["leather_boots_3","Ranger Boots"],["leather_gloves_3","Ranger Gloves"],["leather_helm_3","Ranger's Circlet"],["leather_chest_3","Ranger's Coat"],["gm_ratchet_band","Ratchet Band"],["leather_boots_1","Rawhide Boots"],["leather_gloves_1","Rawhide Gloves"],["greataxe_5","Reaver Axe"],["bow_4","Recurve Bow"],["chain_boots_2","Ringmail Boots"],["chain_chest_2","Ringmail Coat"],["chain_helm_2","Ringmail Coif"],["chain_gloves_2","Ringmail Gloves"],["ritual_boots_3","Ritual Boots"],["ritual_helm_3","Ritual Diadem"],["ritual_chest_3","Ritual Garb"],["ritual_gloves_3","Ritual Wraps"],["plate_chest_8","Riveted Cuirass"],["plate_gloves_8","Riveted Gauntlets"],["plate_boots_8","Riveted Greaves"],["plate_helm_8","Riveted Helm"],["sword1h_1","Ronin Blade"],["blades_1","Ronin Blades (Old Pair)"],["rope_cord","Rope Cord"],["ruby_ring","Ruby Ring"],["rune_ring","Rune Ring"],["silk_boots_4","Runed Boots"],["silk_helm_4","Runed Circlet"],["silk_gloves_4","Runed Gloves"],["axe1h_5","Runed Hatchet"],["rune_dagger_1","Runed Kris"],["staff_4","Runed Staff"],["silk_chest_4","Runed Vestment"],["wand_4","Runed Wand"],["shield_6","Runed Ward"],["greatsword_1","Rusted Greatsword"],["rustic_sash","Rustic Sash"],["silk_boots_5","Sage's Boots"],["silk_helm_5","Sage's Crown"],["silk_gloves_5","Sage's Gloves"],["silk_chest_5","Sage's Robe"],["chain_boots_4","Saint's Boots"],["chain_helm_4","Saint's Coif"],["chain_gloves_4","Saint's Gloves"],["chain_chest_4","Saint's Mail"],["plate_helm_9","Sallet"],["shield_9","Sanctified Ward"],["sapphire_ring","Sapphire Ring"],["brigandine_boots_1","Scale Boots"],["brigandine_helm_1","Scale Cap"],["brigandine_gloves_1","Scale Gloves"],["brigandine_chest_1","Scale Vest"],["silk_boots_3","Scholar's Boots"],["silk_helm_3","Scholar's Circlet"],["silk_gloves_3","Scholar's Gloves"],["silk_chest_3","Scholar's Robe"],["idol_seam","Seam Idol"],["brigandine_boots_9","Sellsword's Boots"],["brigandine_chest_9","Sellsword's Coat"],["brigandine_gloves_9","Sellsword's Gloves"],["brigandine_helm_9","Sellsword's Helm"],["chain_boots_7","Seraph Boots"],["chain_gloves_7","Seraph Gloves"],["chain_helm_7","Seraph Helm"],["chain_chest_7","Seraph Mail"],["shield_15","Seraph Ward"],["staff_12","Serpent Staff"],["wand_5","Serpent Wand"],["leather_chest_1","Shabby Jerkin"],["leather_boots_4","Shadow Boots"],["leather_helm_4","Shadow Circlet"],["sword1h_4","Shadow Edge"],["blades_4","Shadow Edges (Old Pair)"],["leather_gloves_4","Shadow Gloves"],["leather_chest_4","Shadow Leathers"],["claw_4","Shadow Talons"],["greatmace_7","Siege Maul"],["rune_dagger_3","Sigilfang"],["silk_gloves_2","Silken Gloves"],["silk_boots_2","Silken Slippers"],["silk_chest_2","Silken Vest"],["silk_helm_2","Silver Circlet"],["silk_chest_1","Simple Robe"],["dagger_1","Skinning Knife"],["shield_8","Spiked Buckler"],["greatmace_1","Spiked Club"],["fist_2","Spiked Gauntlets"],["greataxe_6","Hewing Axe"],["mace1h_1","Squire's Mace"],["maceshield_1","Squire's Mace (Old Pair)"],["bow_9","Starfall Bow"],["plate_chest_9","Steel Cuirass"],["plate_gloves_9","Steel Gauntlets"],["greatsword_9","Steel Greatsword"],["plate_boots_9","Steel Greaves"],["steel_signet","Steel Signet"],["dagger_2","Stiletto"],["sword1h_9","Storm Edge"],["blades_8","Storm Pair (Old Pair)"],["staff_14","Storm Staff"],["stormfeather_quiver","Stormfeather Quiver"],["bow_8","Stormwing Bow"],["studded_belt","Studded Belt"],["brigandine_boots_8","Studded Boots"],["brigandine_helm_8","Studded Cap"],["brigandine_gloves_8","Studded Gloves"],["brigandine_chest_8","Studded Vest"],["mace1h_7","Sunforged Mace"],["maceshield_7","Sunforged Mace (Old Pair)"],["sunstone_amulet","Sunstone Amulet"],["bow_3","Sylvan Longbow"],["sylvan_quiver","Sylvan Quiver"],["plate_gloves_4","Templar Gauntlets"],["greatsword_4","Templar Greatsword"],["plate_boots_4","Templar Greaves"],["plate_helm_4","Templar Helm"],["plate_chest_4","Templar Plate"],["mace1h_3","Templar's Maul"],["maceshield_3","Templar's Maul (Old Pair)"],["bow_5","Thornwood Bow"],["staff_10","Thornwood Staff"],["claw_2","Tiger Claws"],["greatsword_7","Titan Edge"],["plate_gloves_7","Titan Gauntlets"],["plate_helm_7","Titan Greathelm"],["plate_boots_7","Titan Greaves"],["plate_chest_7","Titan Plate"],["topaz_ring","Topaz Ring"],["leather_boots_9","Tracker Boots"],["leather_gloves_9","Tracker Gloves"],["leather_helm_9","Tracker's Band"],["leather_chest_9","Tracker's Vest"],["idol_tunnel","Tunnel Idol"],["turquoise_amulet","Turquoise Amulet"],["blades_2","Twin Fangs (Old Pair)"],["ritual_helm_1","Twine Band"],["twostone_ring","Two-Stone Ring"],["vanguard_belt","Vanguard Belt"],["veilglass_amulet","Veilglass Amulet"],["veilsilk_cord","Veilsilk Cord"],["staff_15","Void Staff"],["wand_7","Void Wand"],["fist_6","Voidfists"],["ritual_boots_7","Voidweave Boots"],["ritual_helm_7","Voidweave Diadem"],["ritual_chest_7","Voidweave Garb"],["ritual_gloves_7","Voidweave Wraps"],["volley_quiver","Volley Quiver"],["dagger_8","Vowcutter"],["sword1h_5","Wanderer's Blade"],["blades_5","Wanderer's Pair (Old Pair)"],["greataxe_4","War Axe"],["greatsword_5","Warden Blade"],["plate_gloves_5","Warden Gauntlets"],["plate_boots_5","Warden Greaves"],["plate_helm_5","Warden Helm"],["plate_chest_5","Warden Plate"],["wardweave_sash","Wardweave Sash"],["greatmace_4","Warhammer"],["scythe_2","Widowmaker"],["leather_boots_5","Wildwood Boots"],["leather_helm_5","Wildwood Circlet"],["leather_chest_5","Wildwood Garb"],["leather_gloves_5","Wildwood Gloves"],["ritual_boots_6","Witchweave Boots"],["ritual_helm_6","Witchweave Diadem"],["ritual_chest_6","Witchweave Robe"],["ritual_gloves_6","Witchweave Wraps"],["axe1h_4","Wolf Axe"],["claw_3","Wolfhook"],["greataxe_1","Woodcutter's Axe"],["leather_boots_8","Woodsman's Boots"],["leather_gloves_8","Woodsman's Gloves"],["leather_chest_8","Woodsman's Jerkin"],["silk_gloves_1","Wool Gloves"],["silk_boots_1","Wool Shoes"],["claw_5","Wyrm Claws"],["brigandine_boots_4","Wyrmscale Boots"],["shield_11","Wyrmscale Buckler"],["brigandine_chest_4","Wyrmscale Coat"],["brigandine_gloves_4","Wyrmscale Gloves"],["brigandine_helm_4","Wyrmscale Helm"],["axe1h_9","Splitting Axe"],["axe1h_10","Ashen Cleaver"],["axe1h_11","Ironbark Axe"],["axe1h_12","Warden's Axe"],["axe1h_13","Ember Cleaver"],["axe1h_14","Gloomreaver"],["axe1h_15","Oathsplitter"],["mace1h_9","Cudgel"],["mace1h_10","Ironbound Club"],["mace1h_11","Bellringer's Hammer"],["mace1h_12","Gravewarden"],["mace1h_13","Dreadmaul"],["greatspear_1","Hunting Spear"],["greatspear_2","Boar Spear"],["greatspear_3","Pike"],["greatspear_4","Partisan"],["greatspear_5","Glaive Spear"],["greatspear_6","Oathlance"],["katana_1","Drifter Katana"],["katana_2","Reed Katana"],["katana_3","Tide Katana"],["katana_4","Falcon Katana"],["katana_5","Dusk Katana"],["katana_6","Wolfsbane Katana"],["katana_7","Ember Katana"],["katana_8","Ringed Katana"],["katana_9","Frostveil Katana"],["katana_10","Nightfall Katana"],["katana_11","Dragonbone Katana"],["tome_6","Vellum Folio"],["tome_7","Psalter"],["tome_8","Black Ledger"],["tome_9","Oathbound Missal"],["tome_10","Runewright Compendium"],["tome_11","Ember Codex"],["ash_rune_dagger_2","Ashen Glyph Athame"],["ash_rune_dagger_3","Ashen Sigilfang"],["ash_axe1h_13","Ashen Ember Cleaver"],["ash_axe1h_14","Ashen Gloomreaver"],["ash_axe1h_15","Ashen Oathsplitter"],["ash_mace1h_13","Ashen Dreadmaul"],["ash_greatspear_5","Ashen Glaive Spear"],["ash_greatspear_6","Ashen Oathlance"],["ash_katana_9","Ashen Frostveil Katana"],["ash_katana_10","Ashen Nightfall Katana"],["ash_katana_11","Ashen Dragonbone Katana"],["ash_tome_9","Ashen Oathbound Missal"],["ash_tome_10","Ashen Runewright Compendium"],["ash_tome_11","Ashen Ember Codex"]],"reds":[["community_aarons_golemheart","Aaron's Golemheart"],["adders_kiss","Adder's Kiss"],["aegis_of_the_oath","Aegis of the Oath"],["u200_aegis_of_the_unbowed_saint","Aegis of the Unbowed Saint"],["aftershock_greaves","Aftershock Greaves"],["pinnacle_tyrant_brand","Ashbrand of the Tyrant"],["ashen_crown","Ashen Crown"],["community_binas_spotters_helm","Bina's Spotter's Helm"],["u200_blink_thread_sash","Blink-Thread Sash"],["u200_bloodfletch_quiver","Bloodfletch Quiver"],["u200_bloodmoon_quiver","Bloodmoon Quiver"],["u200_bone_choir_diadem","Bone Choir Diadem"],["brass_heart_locket","Brass Heart Locket"],["breastplate_of_the_long_verdict","Breastplate of the Long Verdict"],["brokkr_fang","Brokkr's Fang"],["idol_brokkrs_whetstone","Brokkr's Whetstone"],["bulwark_of_the_last_gate","Bulwark of the Last Gate"],["u200_carrion_lantern","Carrion Lantern"],["chainbreaker","Chainbreaker"],["u200_choir_of_all_heralds","Choir of All Heralds"],["cinderknuckle","Cinderknuckle"],["u200_cinderstep_slippers","Cinderstep Slippers"],["cinderwick","Cinderwick"],["cinderwick_primal","Cinderwick"],["cogwright_grip","Cogwright's Grip"],["u200_crimson_petal_blades","Crimson Petal Blades"],["crook_of_the_vale","Crook of the Vale"],["crown_of_the_bone_king","Crown of the Bone King"],["crown_of_the_quiet_ward","Crown of the Quiet Ward"],["crown_of_the_seventh_verdict","Crown of the Seventh Verdict"],["oathborn_crown_of_the_unbroken","Crown of the Unbroken"],["u200_crusader_s_stride","Crusader's Stride"],["cyclones_eye","Cyclone's Eye"],["dawnforge_maul","Dawnforge Maul"],["dawnwall_bulwark","Dawnwall Bulwark"],["dawnwardens_verdict","Dawnwarden's Verdict"],["deep_forged_band","Deep-Forged Band"],["deep_forged_torc","Deep-Forged Torc"],["deepwarden_lantern","Deepwarden's Lantern"],["diadem_of_the_storm_choir","Diadem of the Storm Choir"],["dreadcrown","Dreadcrown"],["drune_barrow_host","Dwarven Rune of the Barrow Host"],["drune_copper_vein","Dwarven Rune of the Copper Vein"],["drune_deep_quake","Dwarven Rune of the Deep Quake"],["drune_falling_sky","Dwarven Rune of the Falling Sky"],["drune_forge_tongue","Dwarven Rune of the Forge-Tongue"],["drune_grave_rot","Dwarven Rune of the Grave-Rot"],["drune_hallowed_vigil","Dwarven Rune of the Hallowed Vigil"],["drune_long_winter","Dwarven Rune of the Long Winter"],["drune_siege_line","Dwarven Rune of the Siege Line"],["drune_snare_line","Dwarven Rune of the Snare Line"],["drune_turning_mill","Dwarven Rune of the Turning Mill"],["drune_twin_bolt","Dwarven Rune of the Twin Bolt"],["drune_unbroken_ward","Dwarven Rune of the Unbroken Ward"],["u200_ember_tipped_quiver","Ember-Tipped Quiver"],["emberheart_vest","Emberheart"],["emberstride_treads","Emberstride Treads"],["engineers_lodestone","Engineer's Lodestone"],["eye_of_the_tempest","Eye of the Tempest"],["facebreaker","Facebreaker"],["u200_firebrand_codex","Firebrand Codex"],["u200_frostbitten_grips","Frostbitten Grips"],["frostbloom_signet","Frostbloom Signet"],["u200_frostbone_staff","Frostbone Staff"],["frostcaller_lantern","Frostcaller Lantern"],["frostfeather_quiver","Frostfeather Quiver"],["u200_frostgrave_maul","Frostgrave Maul"],["u200_frostmoon_katana","Frostmoon Katana"],["u200_gale_edge_wakizashi","Gale-Edge Wakizashi"],["galeheart_greataxe","Galeheart Greataxe"],["u200_gauntlets_of_the_dawn_forge","Gauntlets of the Dawn Forge"],["girdle_of_the_turning_earth","Girdle of the Turning Earth"],["u200_glacial_quillstaff","Glacial Quillstaff"],["glacier_heart","Glacierheart"],["oathborn_grasp_of_the_sworn","Grasp of the Sworn"],["grave_psalter","Grave Psalter"],["gravecleaver","Gravecleaver"],["gravecleaver_primal","Gravecleaver"],["gravecut","Gravecut"],["u200_gravedigger_s_oath","Gravedigger's Oath"],["gravesong","Gravesong"],["gravesong_primal","Gravesong"],["gravetithe","Gravetithe"],["gravewalkers_girdle","Gravewalker's Girdle"],["community_graxxys_tinderhands","Graxy's Tinderhands"],["halo_of_the_restless_saint","Halo of the Restless Saint"],["hammerbearers_reliquary","Hammerbearer's Relic"],["hand_of_dawn","Hand of Dawn"],["oathborn_heart_of_the_rupture","Heart of the Rupture"],["heart_of_the_white_silence","Heart of the White Silence"],["hearthfire","Hearthfire"],["idol_heartstone","Heartstone of the Deep"],["hexbinders_censer","Hexbinder's Censer"],["hoarfall","Hoarfall"],["hoarfrost_reliquary","Hoarfrost Reliquary"],["tundra_hoarfrost_signet","Hoarfrost Signet"],["hollow_moon_signet","Hollow Moon Signet"],["hollowhorn","Hollowhorn"],["ironroot_signet","Ironroot Signet"],["jarls_roarhelm","Jarl's Roarhelm"],["jarlsbane","Jarlsbane"],["u200_judicator_s_gavel","Judicator's Gavel"],["u200_kagerou_sandals","Kagerou Sandals"],["kingbreaker","Kingbreaker"],["kingbreaker_primal","Kingbreaker"],["lightsworn_reliquary","Lightsworn Reliquary"],["core_link_of_the_sundered_chain","Link of the Sundered Chain"],["community_lizards_quakestride","Lizard's Quakestride"],["mainspring_maul","Mainspring Maul"],["u200_mardoths_last_pebble","Mardoth's Last Pebble"],["u200_mark_of_the_last_sentence","Mark of the Last Sentence"],["u200_marrow_reliquary","Marrow Reliquary"],["idol_millstone_of_mardoth","Millstone of Mardoth"],["mountainheart","Mountainheart"],["mouth_of_the_mire","Mouth of the Mire"],["nightglass","Nightglass"],["pinnacle_jarl_oathring","Oath of the Last Jarl"],["oathbleeder","Oathbleeder"],["oathbreaker","Oathbreaker"],["oathfire_censer","Oathfire Censer"],["idol_oathkeepers_spine","Oathkeeper's Spine"],["orrery_of_the_long_night","Orrery of the Long Night"],["ossuary_stride","Ossuary Stride"],["overclock_coil","Overclock Coil"],["overload_coil","Overload Coil"],["pilgrims_stride","Pilgrim's Stride"],["plaguewrights_grasp","Plaguewright's Grasp"],["psalter_of_the_quiet_host","Psalter of the Quiet Host"],["u200_pyreheart_signet","Pyreheart Signet"],["pyrewardens_mantle","Pyrewarden's Mantle"],["quarrybreaker_gauntlets","Quarrybreaker Fists"],["quiver_of_the_last_watch","Quiver of the Last Watch"],["quiver_of_the_ninth_storm","Quiver of the Ninth Storm"],["u200_raijin_s_fist","Raijin's Fist"],["u200_rampart_of_embers","Rampart of Embers"],["ravenmaw","Ravenmaw"],["reliquary_of_the_second_dawn","Reliquary of the Second Dawn"],["tundra_rime_watch","Rime of the Long Watch"],["rimecrown_staff","Rimecrown"],["rimecrown_staff_primal","Rimecrown"],["idol_rimeglass","Rimeglass of the Deep Pass"],["rimeheart_wand","Rimeheart Wand"],["rimewrit","Rimewrit"],["ring_of_echoing_oaths","Ring of Echoing Oaths"],["u200_rotfang_cleaver","Rotfang Cleaver"],["rotmothers_cradle","Rotmother's Cradle"],["u200_seal_of_the_hammerbearer","Seal of the Hammerbearer"],["u200_seal_of_the_iaido_master","Seal of the Iaido Master"],["shadowsilk_wraps","Shadowsilk Wraps"],["u200_shard_of_the_fourth_spark","Shard of the Fourth Spark"],["shatterglass_pendant","Shatterglass Pendant"],["sheathbreaker_grips","Sheathbreaker Grips"],["shroud_of_the_restless_gale","Shroud of the Restless Gale"],["idol_siege_tally","Siege-wright's Tally"],["siegewatch_hood","Siegewatch Hood"],["signet_of_the_lost_order_chain_reaction","Signet of the Lost Order (Chain Reaction)"],["signet_of_the_lost_order_iron_resolve","Signet of the Lost Order (Iron Resolve)"],["signet_of_the_lost_order_blood_magic","Signet of the Lost Order (Blood Magic)"],["signet_of_the_lost_order_elemental_overload","Signet of the Lost Order (Elemental Overload)"],["signet_of_the_lost_order_spellblade","Signet of the Lost Order (Spellblade)"],["signet_of_the_lost_order_hollow_covenant","Signet of the Lost Order (Hollow Covenant)"],["idol_sindris_coal","Sindri's Coal"],["sindri_edge","Sindri's Edge"],["siphoning_lattice","Siphoning Lattice"],["skyrend","Skyrend"],["community_sleepy_cats_coil","Sleepy's Continental Strap"],["snarewrights_sash","Snarewright's Sash"],["soulreaper","Soulreaper"],["soulsip_wraps","Soulsip Wraps"],["squires_promise","Squire's Promise"],["standard_of_the_last_legion","Standard of the Last Legion"],["starcallers_staff","Starcaller's Staff"],["u200_starsplitter_wand","Starsplitter Wand"],["stonefist_wraps","Stonefist Wraps"],["stormfang","Stormfang"],["stormfang_primal","Stormfang"],["stormfrost_band","Stormfrost Band"],["stormglass_circlet","Stormglass Circlet"],["stormstring","Stormstring"],["stormwake_treads","Stormwake Treads"],["stormweaver_coil","Stormweaver's Coil"],["u200_stormwhirl_mantle","Stormwhirl Mantle"],["oathborn_stride_of_the_first_oath","Stride of the First Oath"],["tearmongers_greaves","Tearmonger's Greaves"],["u200_tempest_hex_ring","Tempest Hex Ring"],["templars_troth","Templar's Troth"],["idol_barrow_kings_tally","The Barrow King's Tally"],["the_bellwarden","The Bellwarden"],["the_blackbile_censer","The Blackbile Censer"],["the_blackbile_seal","The Blackbile Seal"],["charnel_bell","The Charnel Bell"],["dawnward_bulwark","The Dawnward Bulwark"],["deephall_bulwark","The Deephall Bulwark"],["the_dervish_ossuary","The Dervish Ossuary"],["the_eleventh_cut","The Eleventh Cut"],["idol_engineers_gear","The Engineer's Last Gear"],["the_falling_feather","The Falling Feather"],["u200_the_faltering_star","The Faltering Star"],["the_first_vow","The First Vow"],["the_fissure_edge","The Fissure Edge"],["the_gate_that_answers","The Gate That Answers"],["tundra_glacier_oath","The Glacier's Oath"],["glass_soul","The Glass Soul"],["u200_the_grey_covenant","The Grey Covenant"],["the_hangmans_patience","The Hangman's Patience"],["the_headsmans_grip","The Headsman's Grip"],["u200_the_heartwarden_s_cinch","The Heartwarden's Cinch"],["the_heartwood_girdle","The Heartwood Girdle"],["pinnacle_void_crown","The Hollow Star"],["the_hunters_promise","The Hunter's Promise"],["oathborn_the_keepers_ember","The Keeper's Ember"],["the_last_cut","The Last Cut"],["oathborn_the_last_feast","The Last Feast"],["the_last_harvest","The Last Harvest"],["the_last_petal","The Last Petal"],["the_last_volley","The Last Volley"],["the_long_battery","The Long Battery"],["the_long_storm","The Long Storm"],["u200_the_mana_ward_signet","The Mana-Ward Signet"],["oathborn_the_mirror_oath","The Mirror Oath"],["the_motley_court","The Motley Court"],["u200_the_ninefold_wound","The Ninth Cut"],["u200_the_oath_of_iron_and_glass","The Oath of Iron and Glass"],["the_oath_unbroken","The Oath Unbroken"],["the_oath_unspoken","The Oath Unspoken"],["the_oathkeepers_stand","The Oathkeeper's Stand"],["the_oathsplit_fang","The Oathsplit Fang"],["core_oathwardens_chain","The Oathwarden's Chain"],["the_ossuary_chorus","The Ossuary Chorus"],["ossuary_lantern","The Ossuary Lantern"],["the_pale_rake","The Pale Rake"],["u200_the_parrying_tsuba","The Parrying Tsuba"],["the_patient_bastion","The Patient Bastion"],["the_penitent_knuckle","The Penitent Knuckle"],["the_pilgrims_pyre","The Pilgrim's Pyre"],["the_quiet_verdict","The Quiet Verdict"],["u200_the_radiant_wheel","The Radiant Wheel"],["the_reckoners_wraps","The Reckoner's Wraps"],["the_red_carousel","The Red Carousel"],["the_red_harvest","The Red Harvest"],["the_red_hunger","The Red Hunger"],["pinnacle_regent_signet","The Regent's Thirst"],["u200_the_sentinel_s_oath","The Sentinel's Oath"],["the_sextons_last_candle","The Sexton's Last Candle"],["the_siege_wrights_vow","The Siege-Wright's Vow"],["the_slow_verdict","The Slow Verdict"],["the_snarewrights_belt","The Snarewright's Belt"],["the_splitting_psalm","The Splitting Psalm"],["idol_thanes_stormglass","The Thane's Stormglass"],["the_third_thunder","The Third Thunder"],["the_thousand_sparks","The Thousand Sparks"],["u200_the_thunder_psalm","The Thunder Psalm"],["u200_the_thunderhead_signet","The Thunderhead Signet"],["the_unfallen_ancestor","The Unfallen Ancestor"],["the_unspoken_pair","The Unspoken Edge"],["the_unwritten_oath","The Unwritten Oath"],["the_unyielding_vow","The Unyielding Vow"],["idol_vigil_ember","The Vigil-Ember"],["the_widows_patience","The Widow's Patience"],["u200_the_woeweaver_s_grasp","The Woeweaver's Grasp"],["the_wolfs_due","The Wolf's Due"],["thornhide","Thornhide Wraps"],["thornwake","Thornwake"],["thousand_petal_blade","Thousand-Petal Blade"],["thrice_sworn_sash","Thrice-Sworn Sash"],["u200_thunder_anvil_greaves","Thunder-Anvil Greaves"],["thundercoil_gauntlets","Thundercoil Gauntlets"],["thunderhide_quiver","Thunderhide Quiver"],["u200_thunderstead_shield","Thunderstead Shield"],["thunderwake_maul","Thunderwake Maul"],["tickstep_treads","Tickstep Treads"],["tidebreaker_maul","Tidebreaker Maul"],["tidebreaker_maul_primal","Tidebreaker Maul"],["u200_tithe_of_the_red_furrow","Tithe of the Red Furrow"],["twin_fangs_of_the_ronin","Twin Fangs of the Ronin"],["twinscar","Twinscar"],["veilmothers_vestment","Veilmother's Vestment"],["veinwrit_grips","Veinwrit Grips"],["vigil_of_the_last_flame","Vigil of the Last Flame"],["vigil_of_the_storm_saint","Vigil of the Storm Saint"],["vowfire_cuirass","Vowfire Cuirass"],["vowkeeper_band","Vowkeeper Band"],["wand_of_the_ash_march","Wand of the Ash March"],["warlords_girdle","Warlord's Girdle"],["warwrights_seal","Warwright's Seal"],["webspinner_gloves","Webspinner Gloves"],["weeping_talons","Weeping Talons"],["community_wild_trogs_thunderchord","Wild Trog's Thunderchord"],["wildfire_coil","Wildfire Coil"],["u200_windrunner_s_mantle","Windrunner's Mantle"],["windstep_tabi","Windstep Tabi"],["windwhisper","Windwhisper"],["windwrit_treads","Windwrit Treads"],["wintercall_orb","Wintercall Orb"],["wyrmblade_of_the_black_oath","Wyrmblade of the Black Oath"],["u200_kitsune_fire_claws","Kitsune-Fire Claws"],["u200_vortexbinder_obi","Vortexbinder Obi"],["u200_wraithweave_cloak","Wraithweave Cloak"],["u200_moss_ward_cowl","Moss-Ward Cowl"],["u200_spirit_silk_kimono","Spirit-Silk Kimono"],["u200_arcanist_s_overflow","Arcanist's Overflow"],["u200_the_bastion_psalm","The Bastion Psalm"],["u200_hallowed_cinderfall","Hallowed Cinderfall"],["u200_bloodfire_wand","Bloodfire Wand"],["u200_gale_feather_boots","Gale-Feather Boots"],["u200_stormcaller_s_fletching","Stormcaller's Fletching"],["u200_moon_leap_greaves","Moon-Leap Greaves"],["u200_the_prismatic_codex","The Prismatic Codex"],["u200_communion_mace","Communion Mace"],["u200_bonebreaker_wraps","Bonebreaker Wraps"],["u200_mamushi_knuckles","Mamushi Knuckles"],["chaos_ninefold_quiver","Ninefold Quiver"],["chaos_sundered_vow","The Sundered Vow"],["chaos_debtors_maul","Debtor's Maul"],["chaos_starless_crown","Starless Crown"],["chaos_debt_collector","The Debt Collector"],["chaos_heart_of_entropy","Heart of Entropy"],["chaos_silent_scabbard","Silent Scabbard"],["stormfrost_band_primal","Stormfrost Band"],["stormweaver_coil_primal","Stormweaver's Coil"],["webspinner_gloves_primal","Webspinner Gloves"],["windwhisper_primal","Windwhisper"],["shadowsilk_wraps_primal","Shadowsilk Wraps"],["the_long_battery_primal","The Long Battery"],["wintercall_orb_primal","Wintercall Orb"],["the_third_thunder_primal","The Third Thunder"],["dreadcrown_primal","Dreadcrown"],["ashen_crown_primal","Ashen Crown"],["orrery_of_the_long_night_primal","Orrery of the Long Night"],["charnel_bell_primal","The Charnel Bell"],["ironroot_signet_primal","Ironroot Signet"],["stormglass_circlet_primal","Stormglass Circlet"],["windstep_tabi_primal","Windstep Tabi"],["the_thousand_sparks_primal","The Thousand Sparks"],["the_widows_patience_primal","The Widow's Patience"],["thunderwake_maul_primal","Thunderwake Maul"],["thunderhide_quiver_primal","Thunderhide Quiver"],["u200_rune_hollow_idol","Runehollow Idol"],["u200_the_split_aspect_fire","The Split Aspect"],["u200_the_split_aspect_lightning","The Split Aspect"],["u200_the_split_aspect_cold","The Split Aspect"],["u200_the_split_aspect_arcane","The Split Aspect"],["u200_the_split_aspect_poison","The Split Aspect"],["u200_the_split_aspect_physical","The Split Aspect"],["u200_the_split_aspect_void","The Split Aspect"],["u200_the_wyrmling_s_second_heart","The Wyrmling's Second Heart"],["u200_oathstone_of_the_nameless_king_chain_reaction_iron_resolve","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_chain_reaction_blood_magic","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_chain_reaction_elemental_overload","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_chain_reaction_spellblade","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_chain_reaction_hollow_covenant","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_iron_resolve_blood_magic","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_iron_resolve_elemental_overload","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_iron_resolve_spellblade","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_iron_resolve_hollow_covenant","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_blood_magic_elemental_overload","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_blood_magic_spellblade","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_blood_magic_hollow_covenant","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_elemental_overload_spellblade","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_elemental_overload_hollow_covenant","Oathstone of the Nameless King"],["u200_oathstone_of_the_nameless_king_spellblade_hollow_covenant","Oathstone of the Nameless King"],["u200_hands_of_the_gemwright_afterimage_chain","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_channel_conduit","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_fork","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_hunters_mark_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_ice_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_maim","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_afterimage_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_channel_conduit","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_fork","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_hunters_mark_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_ice_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_maim","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_chain_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_fork","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_hunters_mark_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_ice_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_maim","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_channel_conduit_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_hunters_mark_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_ice_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_maim","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_fork_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_ice_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_maim","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_hunters_mark_support_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_maim","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ice_support_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_maim_rain_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_maim_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_maim_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_maim_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_maim_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_maim_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_rain_support_ravening_host","Hands of the Gemwright"],["u200_hands_of_the_gemwright_rain_support_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_rain_support_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ravening_host_skyfall","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ravening_host_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ravening_host_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_ravening_host_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_skyfall_spell_echo","Hands of the Gemwright"],["u200_hands_of_the_gemwright_skyfall_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_spell_echo_tether","Hands of the Gemwright"],["u200_hands_of_the_gemwright_spell_echo_zap_support","Hands of the Gemwright"],["u200_hands_of_the_gemwright_tether_zap_support","Hands of the Gemwright"],["u200_the_roadless_stride","The Roadless Stride"],["u200_sentence_of_the_ninth_bell","Sentence of the Ninth Bell"],["u200_the_eighth_blade_ornament","The Eighth Blade Ornament"],["u200_the_hollow_throne","The Hollow Throne"],["u200_ninth_hammer_shard","Ninth Hammer Shard"],["u200_the_avalanche_edict","The Avalanche Edict"],["u200_the_twin_fletch_idol","The Twinfletch Idol"],["u200_gloomsilver_reliquary","Gloomsilver Reliquary"],["u200_core_splinter_idol","Core-Splinter Idol"],["u200_slimeheart_idol","Slimeheart Idol"],["u200_scab_of_the_wound","Scab of the Wound"],["u200_the_last_square","The Last Square"],["u200_seal_of_the_pyromancer","Seal of the Pyromancer"],["u200_seal_of_the_plague_lord","Seal of the Plague Lord"],["u200_heart_of_the_earthbreaker","Heart of the Earthbreaker"],["u200_seal_of_the_skyhunter","Seal of the Skyhunter"],["u200_bloodmoon_hakama","Bloodmoon Hakama"],["u200_wyrmhide_coat","Wyrmhide Coat"],["u200_seraphfall_mail","Seraphfall Mail"],["u200_hollow_saint_garb","Hollow Saint's Garb"],["u200_cinderfall_greathelm","Cinderfall Greathelm"]],"lines":[["#% increased Area of Effect","area"],["#% increased Armour","idol_armour_s"],["#% increased Attack Speed","attack_speed_local"],["#% increased Bleeding damage (your Bleeds)","bleed_effect"],["#% increased Burning damage (your Ignites)","ignite_effect"],["#% increased Cast Speed","cast_speed"],["#% increased Chain Damage with Chain Skills","idol_chain_damage_m"],["#% increased Cold Damage","cold_dmg_inc"],["#% increased Cooldown Recovery Rate","cooldown_recovery"],["#% increased Critical Strike Chance","crit_local"],["#% increased Damage with Shield Skills","idol_shield_damage_m"],["#% increased Damage with Sparks","idol_grand_eng_brand"],["#% increased Defences","defence_inc"],["#% increased effect of Chill","chill_effect"],["#% increased effect of Shock","shock_effect"],["#% increased effect of your Curses","curse_effect"],["#% increased effect of your Vows","vow_effect98"],["#% increased Elemental Damage","idol_elemental_s"],["#% increased Evasion Rating","idol_evasion_s"],["#% increased Fire Damage","fire_dmg_inc"],["#% increased Freeze duration","freeze_duration"],["#% increased Holy Damage","idol_holy_damage_m"],["#% increased Lightning Damage","lightning_dmg_inc"],["#% increased Mana Regeneration Rate","mana_regen"],["#% increased maximum Life","idol_grand_life_inc"],["#% increased Melee Damage","idol_melee_s"],["#% increased Movement Speed","move_speed"],["#% increased Orbit Damage","idol_orbit_damage_m"],["#% increased Physical Damage","phys_inc_local"],["#% increased Poison Damage","poison_dmg_inc"],["#% increased Poison damage over time (your Poisons)","poison_effect"],["#% increased Projectile Damage","idol_projectile_damage_m"],["#% increased Slam Damage with Slam Skills","idol_slam_damage_m"],["#% increased Spell Damage","spell_inc"],["#% increased Totem Damage","idol_grand_eng_totem"],["#% increased Trap Damage","idol_trap_damage_m"],["#% less Channelling Cost","idol_channel_cost_m"],["#% more Damage with Movement Skills","idol_movement_damage_m"],["#% of Damage Leeched as Energy Shield","es_leech"],["#% of Damage Leeched as Life","life_leech"],["#% of Damage Leeched as Mana","mana_leech"],["#% of Physical Damage taken as Fire, Cold and Lightning","phys_as_elem"],["+# #|plural(one=Afterimage,other=Afterimages) on Melee Attacks (each repeats the blow for 40% of its damage; past 3 from all sources, each adds 10% instead)","idol_grand_melee_afterimage"],["+# Mana gained on Kill","mana_on_kill"],["+# orbiting #|plural(one=projectile,other=projectiles) per cast (Blade Vortex, Orbiting Hammers and the Orbit support; a Blade Vortex ring holds at least 8)","idol_grand_orbit_plus"],["+# to all Attributes","all_attr"],["+# to Armour","armour_local"],["+# to Dexterity","dex_flat"],["+# to Evasion Rating","evasion_local"],["+# to Intelligence","int_flat"],["+# to Level of all Skill Gems","skill_level"],["+# to maximum Energy Shield","es_global"],["+# to maximum Life","life_large"],["+# to maximum Mana","mana"],["+# to maximum Skeleton Warriors (Summon Skeletons, Gravereap) (adds to your Minions from all sources; army max 28 minions in all)","idol_grand_skeleton_plus"],["+# to Strength","str_flat"],["+# to the maximum number of Ballistas and Totems (adds to your bow engines and Totems from all sources; at most 7 Ballistas and 11 Totems in all, and each bow engine count past 7 gives 5% more damage instead)","idol_grand_ballista_plus"],["+# to the maximum number of Skeletal Mages (adds to your Minions from all sources; army max 28 minions in all)","idol_grand_skeleton_wizard_plus"],["+# to the maximum number of Sparks (adds to your Sparks from all sources; at most 27 Sparks)","idol_grand_spark_plus"],["+# to the maximum number of Traps","idol_grand_trap_plus"],["+#% chance to cause Bleeding with Physical hits","bleed_chance"],["+#% chance to Ignite with Fire hits","ignite_chance"],["+#% chance to Shock with Lightning hits","shock_chance"],["+#% to all Elemental Resistances","all_res"],["+#% to all maximum Elemental Resistances","idol_grand_max_res"],["+#% to Cold Resistance","cold_res"],["+#% to Critical Strike Multiplier","crit_multi"],["+#% to Damage over Time Multiplier (Burning, Poison and Bleeding)","dot_multi"],["+#% to Fire Resistance","fire_res"],["+#% to Lightning Resistance","lightning_res"],["+#% to maximum Cold Resistance","max_cold_res91"],["+#% to maximum Fire Resistance","max_fire_res91"],["+#% to maximum Lightning Resistance","max_lightning_res91"],["+#% to maximum Poison Resistance","max_poison_res91"],["+#% to Poison Resistance","poison_res"],["Adds # to # Cold Attack Damage","attack_added_cold"],["Adds # to # Cold Damage","cold_added_local"],["Adds # to # Cold Spell Damage","cold_spell_added"],["Adds # to # Fire Attack Damage","attack_added_fire"],["Adds # to # Fire Damage","fire_added_local"],["Adds # to # Fire Spell Damage","fire_spell_added"],["Adds # to # Lightning Attack Damage","attack_added_lightning"],["Adds # to # Lightning Damage","lightning_added_local"],["Adds # to # Lightning Spell Damage","lightning_spell_added"],["Adds # to # Physical Attack Damage","attack_added_phys"],["Adds # to # Physical Damage","phys_added_local"],["Adds # to # Poison Spell Damage","poison_spell_added"],["Afterimages deal #% increased Damage","idol_grand_eng_afterimage"],["Attribute Requirements Reduced by #%","req_reduce"],["Ballistas and Totems fire #% faster","idol_ballista_speed_m"],["Ballistas and Totems have #% increased Life","idol_ballista_life_m"],["Chains # additional #|plural(one=time,other=times)","idol_grand_chain_plus"],["Damage Penetrates #% Elemental Resistances","idol_grand_elemental_pen"],["Fires # additional #|plural(one=Projectile,other=Projectiles)","idol_grand_bow_projectile"],["Gain # Life per Enemy Killed","life_on_kill"],["Gain #% of # Damage as Extra # Damage","idol_grand_phys_as_fire"],["Ground Slam, Earthshatter and Rending Slam: their spike lines run # #|plural(one=step,other=steps) further","idol_grand_slam_spike"],["Minions deal #% increased Damage","minion_dmg"],["Minions have #% increased Attack and Movement Speed","minion_speed"],["Minions have #% increased maximum Life","minion_life"],["Orbiting blades and hammers turn #% faster","idol_grand_eng_orbit"],["Penetrates #% Poison Resistance","poison_pen85_2h"],["Regenerate # Life per second","life_regen"],["Traps re-arm #% faster","idol_grand_eng_trap"],["Up to #% more Damage over the first second of Channelling","idol_grand_channel_ramp"],["You can lay +# more #|plural(one=Woe,other=Woes) on each enemy","curse_limit"],["Your Minions have #% increased Critical Strike Chance","minion_crit"],["Your Minions have +#% to Critical Strike Multiplier","minion_crit_multi"],["+#% Entropy Multiplier","entropy_multi_wpn"],["Entropy implodes # seconds sooner","idol_entropy_sooner_l"],["Implosions ignore #% Chaos Resistance","idol_chaospen_x"]],"lid":{"life_large":"+# to maximum Life","life":"+# to maximum Life","mana":"+# to maximum Mana","es_global":"+# to maximum Energy Shield","armour_local":"+# to Armour","armour_local_small":"+# to Armour","evasion_local":"+# to Evasion Rating","evasion_local_small":"+# to Evasion Rating","es_local":"+# to maximum Energy Shield","es_local_small":"+# to maximum Energy Shield","defence_inc":"#% increased Defences","phys_inc_local":"#% increased Physical Damage","phys_added_local":"Adds # to # Physical Damage","fire_added_local":"Adds # to # Fire Damage","fire_spell_added":"Adds # to # Fire Spell Damage","fire_dmg_inc":"#% increased Fire Damage","fire_spell_added_2h":"Adds # to # Fire Spell Damage","fire_dmg_inc_2h":"#% increased Fire Damage","cold_added_local":"Adds # to # Cold Damage","cold_spell_added":"Adds # to # Cold Spell Damage","cold_dmg_inc":"#% increased Cold Damage","cold_spell_added_2h":"Adds # to # Cold Spell Damage","cold_dmg_inc_2h":"#% increased Cold Damage","lightning_added_local":"Adds # to # Lightning Damage","lightning_spell_added":"Adds # to # Lightning Spell Damage","lightning_dmg_inc":"#% increased Lightning Damage","lightning_spell_added_2h":"Adds # to # Lightning Spell Damage","lightning_dmg_inc_2h":"#% increased Lightning Damage","poison_spell_added":"Adds # to # Poison Spell Damage","poison_dmg_inc":"#% increased Poison Damage","poison_spell_added_2h":"Adds # to # Poison Spell Damage","poison_dmg_inc_2h":"#% increased Poison Damage","spell_inc":"#% increased Spell Damage","spell_inc_2h":"#% increased Spell Damage","skill_level":"+# to Level of all Skill Gems","skill_level_bow":"+# to Level of all Skill Gems","skill_level_2h":"+# to Level of all Skill Gems","attack_added_phys":"Adds # to # Physical Attack Damage","attack_added_lightning":"Adds # to # Lightning Attack Damage","fire_res":"+#% to Fire Resistance","cold_res":"+#% to Cold Resistance","lightning_res":"+#% to Lightning Resistance","poison_res":"+#% to Poison Resistance","all_res":"+#% to all Elemental Resistances","phys_as_elem":"#% of Physical Damage taken as Fire, Cold and Lightning","str_flat":"+# to Strength","dex_flat":"+# to Dexterity","int_flat":"+# to Intelligence","all_attr":"+# to all Attributes","attack_speed_local":"#% increased Attack Speed","attack_speed":"#% increased Attack Speed","cast_speed":"#% increased Cast Speed","cast_speed_2h":"#% increased Cast Speed","cast_speed_jewel":"#% increased Cast Speed","cooldown_recovery":"#% increased Cooldown Recovery Rate","crit_local":"#% increased Critical Strike Chance","crit_global":"#% increased Critical Strike Chance","crit_multi":"+#% to Critical Strike Multiplier","move_speed":"#% increased Movement Speed","life_regen":"Regenerate # Life per second","mana_regen":"#% increased Mana Regeneration Rate","life_on_kill":"Gain # Life per Enemy Killed","ring_life_on_kill":"Gain # Life per Enemy Killed","mana_on_kill":"+# Mana gained on Kill","ring_mana_on_kill":"+# Mana gained on Kill","mana_leech":"#% of Damage Leeched as Mana","ring_mana_leech":"#% of Damage Leeched as Mana","es_leech":"#% of Damage Leeched as Energy Shield","ring_es_leech":"#% of Damage Leeched as Energy Shield","life_leech":"#% of Damage Leeched as Life","ring_life_leech":"#% of Damage Leeched as Life","area":"#% increased Area of Effect","ignite_chance":"+#% chance to Ignite with Fire hits","shock_chance":"+#% chance to Shock with Lightning hits","ignite_effect":"#% increased Burning damage (your Ignites)","poison_effect":"#% increased Poison damage over time (your Poisons)","shock_effect":"#% increased effect of Shock","freeze_duration":"#% increased Freeze duration","bleed_chance":"+#% chance to cause Bleeding with Physical hits","bleed_effect":"#% increased Bleeding damage (your Bleeds)","dot_multi":"+#% to Damage over Time Multiplier (Burning, Poison and Bleeding)","chill_effect":"#% increased effect of Chill","minion_dmg":"Minions deal #% increased Damage","minion_dmg_2h":"Minions deal #% increased Damage","minion_dmg_jewel":"Minions deal #% increased Damage","minion_life":"Minions have #% increased maximum Life","minion_speed":"Minions have #% increased Attack and Movement Speed","minion_crit":"Your Minions have #% increased Critical Strike Chance","minion_crit_multi":"Your Minions have +#% to Critical Strike Multiplier","curse_effect":"#% increased effect of your Curses","curse_limit":"You can lay +# more #|plural(one=Woe,other=Woes) on each enemy","max_fire_res91":"+#% to maximum Fire Resistance","max_cold_res91":"+#% to maximum Cold Resistance","max_lightning_res91":"+#% to maximum Lightning Resistance","max_poison_res91":"+#% to maximum Poison Resistance","req_reduce":"Attribute Requirements Reduced by #%","idol_life_s":"+# to maximum Life","idol_life_m":"+# to maximum Life","idol_life_l":"+# to maximum Life","idol_life_x":"+# to maximum Life","idol_mana_s":"+# to maximum Mana","idol_mana_m":"+# to maximum Mana","idol_mana_l":"+# to maximum Mana","idol_mana_x":"+# to maximum Mana","idol_es_s":"+# to maximum Energy Shield","idol_es_m":"+# to maximum Energy Shield","idol_es_l":"+# to maximum Energy Shield","idol_es_x":"+# to maximum Energy Shield","idol_armour_s":"#% increased Armour","idol_armour_m":"#% increased Armour","idol_armour_l":"#% increased Armour","idol_armour_x":"#% increased Armour","idol_evasion_s":"#% increased Evasion Rating","idol_evasion_m":"#% increased Evasion Rating","idol_evasion_l":"#% increased Evasion Rating","idol_evasion_x":"#% increased Evasion Rating","idol_phys_s":"#% increased Physical Damage","idol_phys_m":"#% increased Physical Damage","idol_phys_l":"#% increased Physical Damage","idol_phys_x":"#% increased Physical Damage","idol_elemental_s":"#% increased Elemental Damage","idol_elemental_m":"#% increased Elemental Damage","idol_elemental_l":"#% increased Elemental Damage","idol_elemental_x":"#% increased Elemental Damage","idol_spell_s":"#% increased Spell Damage","idol_spell_m":"#% increased Spell Damage","idol_spell_l":"#% increased Spell Damage","idol_spell_x":"#% increased Spell Damage","idol_melee_s":"#% increased Melee Damage","idol_melee_m":"#% increased Melee Damage","idol_melee_l":"#% increased Melee Damage","idol_melee_x":"#% increased Melee Damage","idol_minion_s":"Minions deal #% increased Damage","idol_minion_m":"Minions deal #% increased Damage","idol_minion_l":"Minions deal #% increased Damage","idol_minion_x":"Minions deal #% increased Damage","idol_fire_res_s":"+#% to Fire Resistance","idol_fire_res_m":"+#% to Fire Resistance","idol_fire_res_l":"+#% to Fire Resistance","idol_fire_res_x":"+#% to Fire Resistance","idol_cold_res_s":"+#% to Cold Resistance","idol_cold_res_m":"+#% to Cold Resistance","idol_cold_res_l":"+#% to Cold Resistance","idol_cold_res_x":"+#% to Cold Resistance","idol_lightning_res_s":"+#% to Lightning Resistance","idol_lightning_res_m":"+#% to Lightning Resistance","idol_lightning_res_l":"+#% to Lightning Resistance","idol_lightning_res_x":"+#% to Lightning Resistance","idol_poison_res_s":"+#% to Poison Resistance","idol_poison_res_m":"+#% to Poison Resistance","idol_poison_res_l":"+#% to Poison Resistance","idol_poison_res_x":"+#% to Poison Resistance","idol_move_s":"#% increased Movement Speed","idol_move_m":"#% increased Movement Speed","idol_move_l":"#% increased Movement Speed","idol_move_x":"#% increased Movement Speed","idol_regen_s":"Regenerate # Life per second","idol_regen_m":"Regenerate # Life per second","idol_regen_l":"Regenerate # Life per second","idol_regen_x":"Regenerate # Life per second","idol_attack_speed_s":"#% increased Attack Speed","idol_attack_speed_m":"#% increased Attack Speed","idol_attack_speed_l":"#% increased Attack Speed","idol_attack_speed_x":"#% increased Attack Speed","idol_cast_speed_s":"#% increased Cast Speed","idol_cast_speed_m":"#% increased Cast Speed","idol_cast_speed_l":"#% increased Cast Speed","idol_cast_speed_x":"#% increased Cast Speed","idol_crit_s":"#% increased Critical Strike Chance","idol_crit_m":"#% increased Critical Strike Chance","idol_crit_l":"#% increased Critical Strike Chance","idol_crit_x":"#% increased Critical Strike Chance","idol_crit_multi_s":"+#% to Critical Strike Multiplier","idol_crit_multi_m":"+#% to Critical Strike Multiplier","idol_crit_multi_l":"+#% to Critical Strike Multiplier","idol_crit_multi_x":"+#% to Critical Strike Multiplier","idol_life_kill_s":"Gain # Life per Enemy Killed","idol_life_kill_m":"Gain # Life per Enemy Killed","idol_life_kill_l":"Gain # Life per Enemy Killed","idol_life_kill_x":"Gain # Life per Enemy Killed","idol_mana_regen_s":"#% increased Mana Regeneration Rate","idol_mana_regen_m":"#% increased Mana Regeneration Rate","idol_mana_regen_l":"#% increased Mana Regeneration Rate","idol_mana_regen_x":"#% increased Mana Regeneration Rate","idol_area_s":"#% increased Area of Effect","idol_area_m":"#% increased Area of Effect","idol_area_l":"#% increased Area of Effect","idol_area_x":"#% increased Area of Effect","idol_str_s":"+# to Strength","idol_str_m":"+# to Strength","idol_str_l":"+# to Strength","idol_str_x":"+# to Strength","idol_dex_s":"+# to Dexterity","idol_dex_m":"+# to Dexterity","idol_dex_l":"+# to Dexterity","idol_dex_x":"+# to Dexterity","idol_int_s":"+# to Intelligence","idol_int_m":"+# to Intelligence","idol_int_l":"+# to Intelligence","idol_int_x":"+# to Intelligence","idol_ballista_speed_m":"Ballistas and Totems fire #% faster","idol_ballista_speed_l":"Ballistas and Totems fire #% faster","idol_ballista_speed_x":"Ballistas and Totems fire #% faster","idol_ballista_life_m":"Ballistas and Totems have #% increased Life","idol_ballista_life_l":"Ballistas and Totems have #% increased Life","idol_ballista_life_x":"Ballistas and Totems have #% increased Life","idol_minion_life_m":"Minions have #% increased maximum Life","idol_minion_life_l":"Minions have #% increased maximum Life","idol_minion_life_x":"Minions have #% increased maximum Life","idol_minion_speed_m":"Minions have #% increased Attack and Movement Speed","idol_minion_speed_l":"Minions have #% increased Attack and Movement Speed","idol_minion_speed_x":"Minions have #% increased Attack and Movement Speed","idol_channel_area_m":"#% increased Area of Effect","idol_channel_area_l":"#% increased Area of Effect","idol_channel_area_x":"#% increased Area of Effect","idol_channel_cost_m":"#% less Channelling Cost","idol_channel_cost_l":"#% less Channelling Cost","idol_channel_cost_x":"#% less Channelling Cost","idol_slam_damage_m":"#% increased Slam Damage with Slam Skills","idol_slam_damage_l":"#% increased Slam Damage with Slam Skills","idol_slam_damage_x":"#% increased Slam Damage with Slam Skills","idol_slam_area_m":"#% increased Area of Effect","idol_slam_area_l":"#% increased Area of Effect","idol_slam_area_x":"#% increased Area of Effect","idol_chain_damage_m":"#% increased Chain Damage with Chain Skills","idol_chain_damage_l":"#% increased Chain Damage with Chain Skills","idol_chain_damage_x":"#% increased Chain Damage with Chain Skills","idol_orbit_damage_m":"#% increased Orbit Damage","idol_orbit_damage_l":"#% increased Orbit Damage","idol_orbit_damage_x":"#% increased Orbit Damage","idol_bow_area_m":"#% increased Area of Effect","idol_bow_area_l":"#% increased Area of Effect","idol_bow_area_x":"#% increased Area of Effect","idol_projectile_damage_m":"#% increased Projectile Damage","idol_projectile_damage_l":"#% increased Projectile Damage","idol_projectile_damage_x":"#% increased Projectile Damage","idol_holy_damage_m":"#% increased Holy Damage","idol_holy_damage_l":"#% increased Holy Damage","idol_holy_damage_x":"#% increased Holy Damage","idol_poison_damage_m":"#% increased Poison Damage","idol_poison_damage_l":"#% increased Poison Damage","idol_poison_damage_x":"#% increased Poison Damage","idol_fire_damage_m":"#% increased Fire Damage","idol_fire_damage_l":"#% increased Fire Damage","idol_fire_damage_x":"#% increased Fire Damage","idol_cold_damage_m":"#% increased Cold Damage","idol_cold_damage_l":"#% increased Cold Damage","idol_cold_damage_x":"#% increased Cold Damage","idol_lightning_damage_m":"#% increased Lightning Damage","idol_lightning_damage_l":"#% increased Lightning Damage","idol_lightning_damage_x":"#% increased Lightning Damage","idol_movement_damage_m":"#% more Damage with Movement Skills","idol_movement_damage_l":"#% more Damage with Movement Skills","idol_movement_damage_x":"#% more Damage with Movement Skills","idol_trap_damage_m":"#% increased Trap Damage","idol_trap_damage_l":"#% increased Trap Damage","idol_trap_damage_x":"#% increased Trap Damage","idol_shield_damage_m":"#% increased Damage with Shield Skills","idol_shield_damage_l":"#% increased Damage with Shield Skills","idol_shield_damage_x":"#% increased Damage with Shield Skills","idol_bleed_damage_m":"#% increased Bleeding damage (your Bleeds)","idol_bleed_damage_l":"#% increased Bleeding damage (your Bleeds)","idol_bleed_damage_x":"#% increased Bleeding damage (your Bleeds)","idol_mana_leech_l":"#% of Damage Leeched as Mana","idol_mana_leech_x":"#% of Damage Leeched as Mana","idol_grand_chain_plus":"Chains # additional #|plural(one=time,other=times)","idol_grand_ballista_plus":"+# to the maximum number of Ballistas and Totems (adds to your bow engines and Totems from all sources; at most 7 Ballistas and 11 Totems in all, and each bow engine count past 7 gives 5% more damage instead)","idol_grand_orbit_plus":"+# orbiting #|plural(one=projectile,other=projectiles) per cast (Blade Vortex, Orbiting Hammers and the Orbit support; a Blade Vortex ring holds at least 8)","idol_grand_skeleton_plus":"+# to maximum Skeleton Warriors (Summon Skeletons, Gravereap) (adds to your Minions from all sources; army max 28 minions in all)","idol_grand_slam_spike":"Ground Slam, Earthshatter and Rending Slam: their spike lines run # #|plural(one=step,other=steps) further","idol_grand_bow_projectile":"Fires # additional #|plural(one=Projectile,other=Projectiles)","idol_grand_channel_ramp":"Up to #% more Damage over the first second of Channelling","idol_grand_phys_as_fire":"Gain #% of # Damage as Extra # Damage","idol_grand_phys_as_cold":"Gain #% of # Damage as Extra # Damage","idol_grand_phys_as_lightning":"Gain #% of # Damage as Extra # Damage","idol_grand_elemental_pen":"Damage Penetrates #% Elemental Resistances","idol_grand_life_inc":"#% increased maximum Life","idol_grand_max_res":"+#% to all maximum Elemental Resistances","idol_grand_max_poison_res":"+#% to maximum Poison Resistance","idol_grand_melee_afterimage":"+# #|plural(one=Afterimage,other=Afterimages) on Melee Attacks (each repeats the blow for 40% of its damage; past 3 from all sources, each adds 10% instead)","idol_grand_skeleton_wizard_plus":"+# to the maximum number of Skeletal Mages (adds to your Minions from all sources; army max 28 minions in all)","idol_grand_eng_totem":"#% increased Totem Damage","idol_grand_eng_afterimage":"Afterimages deal #% increased Damage","idol_grand_eng_orbit":"Orbiting blades and hammers turn #% faster","idol_grand_eng_trap":"Traps re-arm #% faster","idol_grand_eng_minion":"Minions have #% increased Attack and Movement Speed","idol_grand_eng_brand":"#% increased Damage with Sparks","idol_grand_eng_slam":"#% increased Area of Effect","idol_grand_trap_plus":"+# to the maximum number of Traps","idol_grand_spark_plus":"+# to the maximum number of Sparks (adds to your Sparks from all sources; at most 27 Sparks)","drune_life":"+# to maximum Life","drune_mana":"+# to maximum Mana","drune_es":"+# to maximum Energy Shield","drune_armour":"#% increased Armour","drune_evasion":"#% increased Evasion Rating","drune_phys":"#% increased Physical Damage","drune_elemental":"#% increased Elemental Damage","drune_spell":"#% increased Spell Damage","drune_melee":"#% increased Melee Damage","drune_projectile":"#% increased Projectile Damage","drune_minion":"Minions deal #% increased Damage","drune_fire_res":"+#% to Fire Resistance","drune_cold_res":"+#% to Cold Resistance","drune_lightning_res":"+#% to Lightning Resistance","drune_poison_res":"+#% to Poison Resistance","drune_attack_speed":"#% increased Attack Speed","drune_cast_speed":"#% increased Cast Speed","drune_crit":"#% increased Critical Strike Chance","drune_crit_multi":"+#% to Critical Strike Multiplier","drune_move":"#% increased Movement Speed","drune_regen":"Regenerate # Life per second","drune_area":"#% increased Area of Effect","drune_str":"+# to Strength","drune_dex":"+# to Dexterity","drune_int":"+# to Intelligence","ring_move_speed":"#% increased Movement Speed","gloves_cast_speed":"#% increased Cast Speed","ring_attack_speed":"#% increased Attack Speed","ring_cast_speed":"#% increased Cast Speed","poison_pen85_2h":"Penetrates #% Poison Resistance","poison_pen85_1h":"Penetrates #% Poison Resistance","vow_effect98":"#% increased effect of your Vows","attack_added_fire":"Adds # to # Fire Attack Damage","attack_added_cold":"Adds # to # Cold Attack Damage","entropy_multi_wpn":"+#% Entropy Multiplier","entropy_multi_jwl":"+#% Entropy Multiplier","idol_entropy_multi_s":"+#% Entropy Multiplier","idol_entropy_multi_m":"+#% Entropy Multiplier","idol_entropy_sooner_l":"Entropy implodes # seconds sooner","idol_chaospen_x":"Implosions ignore #% Chaos Resistance"}};
/* more affix files in the game data: affixes_riven95.json (59 Riven T0 lines, same texts as the normal lines), affixes_pen95.json and
   affixes_vowfx98.json (loaded only while a game switch is on, so they may not be live yet) */
const RAW_LINE=Object.assign({},DATA.lid);DATA.lines.forEach(x=>{RAW_LINE[x[1]]=x[0];});
const COND_LINE=new Set(["fire_pen95_2h","fire_pen95_1h","cold_pen95_2h","cold_pen95_1h","lightning_pen95_2h","lightning_pen95_1h","elemental_pen95_amulet","vow_effect98"]);
(function(){
  "life_large,armour_local,armour_local_small,evasion_local,evasion_local_small,es_local,es_local_small,defence_inc,phys_inc_local,phys_added_local,fire_added_local,fire_spell_added,fire_dmg_inc,fire_spell_added_2h,fire_dmg_inc_2h,cold_added_local,cold_spell_added,cold_dmg_inc,cold_spell_added_2h,cold_dmg_inc_2h,lightning_added_local,lightning_spell_added,lightning_dmg_inc,lightning_spell_added_2h,lightning_dmg_inc_2h,poison_spell_added,poison_dmg_inc,poison_spell_added_2h,poison_dmg_inc_2h,spell_inc,spell_inc_2h,fire_res,cold_res,lightning_res,poison_res,phys_as_elem,str_flat,dex_flat,int_flat,attack_speed_local,cast_speed,cast_speed_2h,crit_local,crit_global,crit_multi,life_regen,area,minion_dmg,minion_dmg_2h,minion_dmg_jewel,max_fire_res91,max_cold_res91,max_lightning_res91,max_poison_res91,skill_level,skill_level_bow,skill_level_2h,cooldown_recovery,dot_multi".split(",").forEach(id=>{DATA.lid["riven95_"+id]=DATA.lid[id];});
  [["fire","Fire"],["cold","Cold"],["lightning","Lightning"]].forEach(([k,n])=>{const t="Penetrates #% "+n+" Resistance";
    DATA.lid[k+"_pen95_2h"]=t;DATA.lid[k+"_pen95_1h"]=t;DATA.lines.push([t,k+"_pen95_2h"]);});
  DATA.lid.elemental_pen95_amulet="Damage Penetrates #% Elemental Resistances";
  DATA.lid.vow_effect98="#% increased effect of your Vows";if(!DATA.lines.some(x=>x[1]==="vow_effect98"))DATA.lines.push([DATA.lid.vow_effect98,"vow_effect98"]); /* the line is also in the DATA text above: add it only once, or the picker lists it twice */
})();
/* game texts carry template syntax: "#" is a number, "#|plural(one=a,other=b)" picks a word by that number. Show them as plain, readable text. */
function cleanLineText(t){
  let n=0;const L=["X","Y","Z","W"];
  return String(t).replace(/#\|plural\(one=([^,)]*),other=([^)]*)\)/g,(m,a,b)=>b.startsWith(a)?a+"("+b.slice(a.length)+")":a+"/"+b)
    .replace(/#/g,()=>L[Math.min(n++,L.length-1)]);
}
DATA.lines.forEach(x=>{x[0]=cleanLineText(x[0]);});
Object.keys(DATA.lid).forEach(k=>{DATA.lid[k]=cleanLineText(DATA.lid[k]);});
/* alphabetical order by the readable text: leading symbols, numbers and X/Y placeholders do not count */
const COLL=new Intl.Collator("en",{numeric:true,sensitivity:"base"});
const sortKey=t=>String(t).replace(/^(?:[^A-Za-z]|\b[XYZW]\b)+/,"").replace(/^The\s+/i,"");
const byText=(a,b)=>COLL.compare(sortKey(a[1]),sortKey(b[1]))||COLL.compare(String(a[1]),String(b[1]))||COLL.compare(String(a[0]),String(b[0]));
DATA.lines.sort((a,b)=>byText([a[1],a[0]],[b[1],b[0]]));DATA.bases.sort(byText);DATA.reds.sort(byText);
const LINE_IDS={};Object.keys(DATA.lid).forEach(i=>{(LINE_IDS[DATA.lid[i]]=LINE_IDS[DATA.lid[i]]||[]).push(i);});
/* search text per named line: readable text, the raw game text with # and plural(), and every game id that shows this line */
const LINE_HAY={};DATA.lines.forEach(x=>{const ids=LINE_IDS[x[0]]||[x[1]];LINE_HAY[x[1]]=(x[0]+" "+ids.map(i=>RAW_LINE[i]||"").join(" ")+" "+ids.join(" ")).toLowerCase();});
const BASEN=Object.fromEntries(DATA.bases),REDN=Object.fromEntries(DATA.reds),LINEN=DATA.lid,RED_IDS={};DATA.reds.forEach(x=>(RED_IDS[x[1]]=RED_IDS[x[1]]||[]).push(x[0]));
/* Display language (game texts only). Logic, export and share data keep the English names; the maps below only change what is shown. Files: lang/<code>.json, loaded when picked. */
const LANGS=[["en","English"],["bg","Български"],["cs","Čeština"],["da","Dansk"],["de","Deutsch"],["el","Ελληνικά"],["es-ES","Español (España)"],["es-419","Español (Latinoamérica)"],["fi","Suomi"],["fr","Français"],["hu","Magyar"],["id","Indonesia"],["it","Italiano"],["ja","日本語"],["ko","한국어"],["ms","Melayu"],["nb","Norsk bokmål"],["nl","Nederlands"],["pl","Polski"],["pt-BR","Português (Brasil)"],["pt-PT","Português (Portugal)"],["ro","Română"],["ru","Русский"],["sv","Svenska"],["th","ไทย"],["tr","Türkçe"],["uk","Українська"],["vi","Tiếng Việt"],["zh-Hans","简体中文"],["zh-Hant","繁體中文"]];
const LX={ui:{},ui2:{},raw:{},lines:{},bases:{},reds:{}};let DC_REV=null;let LANG="en";
const dl=t=>LX.lines[t]||t;
const BASED=new Proxy(BASEN,{get:(o,k)=>typeof k==="string"?(LX.bases[k]||o[k]):o[k]});
/* Reds that share a name (a Primal copy, the six Signets of the Lost Order) get a label that tells them apart; the id and the name in the data stay as they are */
const REDLAB={};Object.entries(RED_IDS).forEach(([n,ids])=>{if(ids.length<2)return;const norm=ids.filter(i=>!/_primal$/.test(i)),slug=n.toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"");
  ids.forEach(i=>{if(/_primal$/.test(i))REDLAB[i]=n+" (Primal)";else if(norm.length>1){const bi=i.replace(/^u200_/,""),rest=bi.startsWith(slug+"_")?bi.slice(slug.length+1):i;REDLAB[i]=n+" ("+rest.split("_").map(w=>w[0].toUpperCase()+w.slice(1)).join(" ")+")";}});});
const REDD=new Proxy(REDN,{get:(o,k)=>typeof k==="string"?(LX.reds[k]||REDLAB[k]||o[k]):o[k]});
const LINED=new Proxy(LINEN,{get:(o,k)=>typeof k==="string"&&o[k]!==undefined?dl(o[k]):o[k]});
/* item name on the ground: unique/base part in the chosen language, a rare's random prefix stays English */
function dItemName(it){
  if(LANG==="en"||!it)return it&&it.name;
  if(it.rar==="U"&&it.redId&&LX.reds[it.redId])return LX.reds[it.redId];
  const bn=it.baseId&&BASEN[it.baseId],lb=it.baseId&&LX.bases[it.baseId];
  if(bn&&lb&&it.name.endsWith(bn))return it.name.slice(0,it.name.length-bn.length)+lb;
  return it.name;
}
/* red ids that are Primal versions (same name as the normal red in the game files) */
const PRIMAL_IDS=new Set(["the_oath_unbroken", "signet_of_the_lost_order_chain_reaction", "signet_of_the_lost_order_iron_resolve", "signet_of_the_lost_order_blood_magic", "signet_of_the_lost_order_elemental_overload", "signet_of_the_lost_order_spellblade", "signet_of_the_lost_order_hollow_covenant", "kingbreaker_primal", "gravesong_primal", "gravecleaver_primal", "tidebreaker_maul_primal", "stormfang_primal", "rimecrown_staff_primal", "cinderwick_primal", "stormfrost_band_primal", "stormweaver_coil_primal", "webspinner_gloves_primal", "windwhisper_primal", "shadowsilk_wraps_primal", "the_long_battery_primal", "wintercall_orb_primal", "the_third_thunder_primal", "dreadcrown_primal", "ashen_crown_primal", "orrery_of_the_long_night_primal", "charnel_bell_primal", "ironroot_signet_primal", "stormglass_circlet_primal", "windstep_tabi_primal", "the_thousand_sparks_primal", "the_widows_patience_primal", "thunderwake_maul_primal", "thunderhide_quiver_primal"]);
const redIdOf=n=>{const base=n.replace(/ \(Primal\)$/,""),pr=base!==n,l=RED_IDS[base]||[];return l.find(i=>PRIMAL_IDS.has(i)===pr)||l[0]||"";};
/* BOFILTER format: Broken Oath developer file loot_filter.md (build 73) and the community Broken Oath Builder. */
const MAX_RULES=200;
/* Easy Mode keeps one set of rules per pick. Only when that would pass this many rules do picks of the same colour share rules, and as a last step all picks share one list (see easyGen). Same as the game's limit of 200 rules since Patch 87. */
const EASY_PACK_LIMIT=MAX_RULES;
/* Shared copy: one wording for messages that appear in several places */
const COPY={
 sell:"Sell is known from the game files for gems: a gem under a Gems Sell rule is sold when it lands. For other items the exact behaviour is not confirmed. The Drop Test treats Sell like Hide and counts it as Sell.",
 never:"Uniques, runes, Dwarven Runes, the Cube, currency, gold and flasks always stay visible, even when a Hide rule matches. Gems show unless a Gems rule hides or sells them.",
 undo:"Undo (Ctrl+Z) brings it back.",
 limit:"The game takes "+MAX_RULES+" rules.",
 blocked:"Copy is blocked here.",
 storage:"Could not save in this browser (private mode or storage full).",
 unknown:"Fields this page does not know are kept as they are.",
 over:n=>"Too many rules: "+n+" / "+MAX_RULES+". Uncheck some options."
};
/* Help popovers: every ? button carries data-help=<key>. Opens on hover, focus and click/tap (click keeps it open). */
const T={
 type:[[0,"Any gear"],[1,"Weapons"],[2,"Armour"],[3,"Jewellery"],[4,"Rune bases"],[5,"Helms"],[6,"Body armour"],[7,"Gloves"],[8,"Boots"],[9,"Shields, foci & quivers"],[10,"Rings"],[11,"Amulets"],[12,"Belts"],[13,"Core-touched"],[14,"Idols"],[15,"4+ sockets"],[16,"Truesworn"],[17,"Gems"],[18,"Bows"],[19,"Claws"],[20,"Daggers"],[21,"Dual blades"],[22,"Fist weapons"],[23,"2H swords"],[24,"2H axes"],[25,"2H maces"],[26,"Mace and shield"],[27,"1H axes"],[28,"1H maces"],[29,"1H swords"],[30,"Scythes"],[31,"Staves"],[32,"Wands"],[33,"Dwarven Runes"],[34,"Quivers"]],
 rarity:[[0,"Any rarity"],[1,"Normal"],[2,"Magic"],[3,"Normal and magic"],[4,"Rare"],[5,"Rare and unique"]],
 level:[[0,"Any level"],[1,"Below 20"],[2,"Below 40"],[3,"Below 60"],[4,"Below 75"],[5,"60 and up"],[6,"75 and up"],[7,"82 and up"]],
 line:[[0,"Any line"],[1,"Life"],[2,"Resistance"],[3,"Minion"],[4,"Move speed"],[5,"+Skill levels"],[6,"Spell"],[7,"Critical"],[8,"Attack speed"],[9,"Cast speed"],[10,"Mana"],[11,"Fire damage"],[12,"Cold damage"],[13,"Lightning damage"],[14,"Physical damage"],[15,"Poison and ignite"],[16,"Fire res"],[17,"Cold res"],[18,"Lightning res"],[19,"Poison res"],[20,"Attributes"],[21,"Defence"],[22,"Leech and recovery"],[23,"Area"],[24,"Bleed and DoT"],[25,"Curses"],[26,"Cooldown recovery"],[27,"Vow effect"]] /* 27 = Vow effect: confirmed in game (import of ...1,0,1,0,27,0,... shows "Vow effect" in HAS A LINE, 22.11.2026) */,
 quality:[[0,"Any roll"],[1,"Good roll"],[2,"Top roll"]],
 count:[[0,"1+ lines"],[1,"2+ lines"],[2,"3+ lines"]],
 action:[[0,"Hide"],[1,"Show"],[2,"Highlight"],[3,"Highlight + beam"],[4,"Sell"]],
 sound:[[255,"Auto (game default)"],[0,"Silent"],[1,"Chime"],[2,"Soft"],[3,"Jewel"],[4,"Wind"]]
};
const COLOURS=[[0,"Ember","#e8901c"],[1,"Jade","#4deb85"],[2,"Frost","#5cc7ff"],[3,"Bone","#fff2d6"],[4,"Gold","#ff990d"],[5,"Blood","#d4382f"],[6,"Ash","#9a9a9a"],[7,"White","#ffffff"]];
const FIELDS=["on","type","rarity","level","line","action","colour","quality","count","sound"];
const NEW_RULE={name:"",on:1,type:0,rarity:0,level:0,line:0,action:1,colour:0,quality:0,count:0,sound:255};
/* name lists are alphabetical (numbers natural, a leading + ignored); "Any ..." stays first. Scales with a real order (rarity, levels, tiers, roll quality, lines, sockets, grades) keep it. */
const ALPHA=(a,b)=>COLL.compare(String(a[1]).replace(/^[+\s]+/,""),String(b[1]).replace(/^[+\s]+/,""))||COLL.compare(String(a[1]),String(b[1]));
const alphaKeep=a=>{const h=a.shift();a.sort(ALPHA);a.unshift(h);};
alphaKeep(T.type);alphaKeep(T.line);T.sound.sort(ALPHA);COLOURS.sort(ALPHA);
const nameOf=(k,v)=>{const x=T[k].find(o=>o[0]===v);return x?x[1]:"value "+v;};
const colOf=v=>(COLOURS.find(c=>c[0]===v)||COLOURS.find(c=>c[0]===0));
const uid=()=>Math.random().toString(36).slice(2,9);
const newRule=o=>Object.assign({extra:[],m:[]},NEW_RULE,o||{});
/* MORE options: the part after the ten fields, written as ,3:key=value;key=value (3 = filter version 3). Several entries in one field are joined with + */
/* key order as the game writes it. Seen in exports (22.11.2026): b a t k n s d i q g gx r rn u (one string with all of them), b s rt, a an na t k n d, b a na nb rn, a na rn, b a nb, nr rn, an rn, a all. Guessed: where all, an, na, nb and nr sit among each other, and rt after u. Readers use the key name. */
const MORE_ORDER=["b","a","all","an","na","nb","t","k","n","s","d","i","q","g","gx","r","nr","rn","u","rt"];
/* data version of the item lists above */
const DATA_BUILD={build:90,source:"local game files",read:"2026-11-25",apiChecked:88};
const MAXL={a:6,b:12,rn:12,na:6}; /* list limits shown in the game (Patch 87) */
const parseMore=s=>s.split(";").filter(x=>x!=="").map(seg=>{const i=seg.indexOf("=");return i<0?[seg,null]:[seg.slice(0,i),seg.slice(i+1)];});
const moreStr=r=>r.m&&r.m.length?",3:"+r.m.map(p=>p[1]===null?p[0]:p[0]+"="+p[1]).join(";"):"";
const mval=(r,k)=>{const p=(r.m||[]).find(x=>x[0]===k);return p&&p[1]!==null?p[1]:"";};
function mset(r,k,v){
  const i=r.m.findIndex(x=>x[0]===k);
  if(v===""||v==null){if(i>=0)r.m.splice(i,1);return;}
  if(i>=0){r.m[i][1]=String(v);return;}
  const rank=x=>{const j=MORE_ORDER.indexOf(x);return j<0?99:j;};
  let at=r.m.findIndex(x=>rank(x[0])>rank(k));if(at<0)at=r.m.length;
  r.m.splice(at,0,[k,String(v)]);
}
const mrng=(r,k)=>{const m=mval(r,k).match(/^(\d+)-(\d+)$/);return m?[+m[1],+m[2]]:[0,0];};
const msetRng=(r,k,lo,hi)=>mset(r,k,lo||hi?lo+"-"+hi:"");
/* the game writes some ids with a capital (Life, Mana, Area, Bow_1) even when they were entered in lower case; all ids in the data are lower case, so lists are read lower-cased (the stored code text stays as it was) */
const mlist=(r,k)=>mval(r,k)?mval(r,k).split("+").filter(Boolean).map(x=>x.toLowerCase()):[];
const msetList=(r,k,a)=>mset(r,k,a.join("+"));
/* "Any N of them" belongs to named lines only (the game test and chip steps use lines: any -> any 2 -> ... -> all; an exported 6 lines gave an=2..5 and all=1, never an=6). Keep an between 2 and (lines - 1); with fewer than 3 lines there is no Any N. */
function fixAn(r){const n=mlist(r,"a").length,an=+mval(r,"an")||0;if(!an)return;if(n<3)mset(r,"an","");else if(an>=n)mset(r,"an",n-1);}
const hasRaw=r=>(r.m||[]).some(p=>p[1]===null||!MORE_ORDER.includes(p[0]));
/* the game does not allow "none of these" bases or reds together with All / Any N of the lines (decode already warns about it); Any N belongs to named lines only, never to bases or reds. Compilers must never produce such a rule. */
const ruleClash=r=>(mval(r,"nb")==="1"||mval(r,"nr")==="1")&&(mval(r,"all")==="1"||!!mval(r,"an"));
const anOnBasesOrReds=r=>!!mval(r,"an")&&!mlist(r,"a").length&&(mlist(r,"b").length>0||mlist(r,"rn").length>0);

function encode(f){return "BOFILTER:1,"+f.preset+f.rules.map(r=>"|"+FIELDS.map(k=>r[k]).join(",")+moreStr(r)+(r.extra&&r.extra.length?","+r.extra.join(","):"")).join("");}
function decode(text){
  const s=String(text||"").trim().replace(/\s+/g,"");
  const m=s.match(/BOFILTER:(\d+),([^|]*)((?:\|[^|]*)*)$/i);
  if(!m)throw new Error("This is not a loot filter code. It should start with BOFILTER:1,");
  const notes=[];
  if(m[1]!=="1")notes.push("This code is format "+m[1]+"; Oathfilter knows format 1. Check the result in the game.");
  const f={preset:m[2]||"-1",rules:[]};
  m[3].split("|").slice(1).forEach(p=>{
    const v=p.split(","),r=newRule();
    FIELDS.forEach((k,i)=>{if(v[i]!==undefined&&v[i]!==""){const n=Number(v[i]);r[k]=Number.isFinite(n)?n:r[k];}});
    r.extra=v.slice(FIELDS.length);r.m=[];
    if(r.extra[0]&&/^3:/.test(r.extra[0])){r.m=parseMore(r.extra[0].slice(2));r.extra=r.extra.slice(1);}
    f.rules.push(r);
  });
  const known=(k,v)=>k==="colour"?COLOURS.some(c=>c[0]===v):T[k].some(o=>o[0]===v);
  const bad=f.rules.filter((_,i)=>{const v=m[3].split("|").slice(1)[i].split(",");return FIELDS.some((k,j)=>v[j]===undefined||v[j]===""||!Number.isFinite(Number(v[j])));}).length;
  if(bad)notes.push(bad+" rule"+(bad>1?"s have":" has")+" missing or unreadable fields. Default values were filled in, so the exported code can differ from the one you pasted.");
  const odd=f.rules.filter(r=>["type","rarity","level","line","action","colour","quality","count","sound"].some(k=>!known(k,r[k]))).length;
  if(odd)notes.push(odd+" rule"+(odd>1?"s use":" uses")+" values this page does not know. They are kept as they are, but the drop test may read them wrongly.");
  if(f.rules.length>MAX_RULES)notes.push("The code has "+f.rules.length+" rules. "+COPY.limit);
  const wide=[];f.rules.forEach((r,i)=>{const over=Object.keys(MAXL).map(k=>mlist(r,k).length-MAXL[k]).some(x=>x>0),n=mlist(r,"a").length;if(over)wide.push((i+1)+" ("+n+")");});
  const noAn=[];f.rules.forEach((r,i)=>{if(mval(r,"an")&&!mlist(r,"a").length)noAn.push(i+1);});
  const clash=[];f.rules.forEach((r,i)=>{if((mval(r,"nb")==="1"||mval(r,"nr")==="1")&&(mval(r,"all")==="1"||mval(r,"an")))clash.push(i+1);});
  if(wide.length)notes.push("Rule "+wide.slice(0,6).join(", ")+(wide.length>6?" …":"")+" goes over a list limit (6 named lines, 12 bases, 12 reds, 6 not-these lines). The Editor keeps to these limits, so check how the game reads the extra entries.");
  if(noAn.length)notes.push("Rule "+noAn.slice(0,6).join(", ")+" has Any N but no named lines. Any N only works with named lines, so the game may ignore it.");
  if(clash.length)notes.push("Rule "+clash.slice(0,6).join(", ")+" combines a \"none of these\" bases or reds list with All or Any N of the lines. The game does not allow that.");
  if(f.rules.some(r=>r.extra.length||hasRaw(r)))notes.push("Some rules carry fields this page does not know. They are kept as they are.");
  const warn=[];if(f.rules.length>MAX_RULES)warn.push("Your saved filter has "+f.rules.length+" rules. "+COPY.limit);
  if(wide.length)warn.push("A saved rule goes over a list limit (6 named lines, 12 bases, 12 reds, 6 not-these lines).");if(bad)warn.push("A saved rule had unreadable fields and was filled with defaults.");
  return{filter:f,notes,warn};
}

/* how the page reads a rule: a best guess, not checked in the game */
const LINEMAP={Life:[1],FireRes:[2,16],ColdRes:[2,17],LightningRes:[2,18],PoisonRes:[2,19],AllRes:[2,16,17,18,19],MaxFireRes91:[2,16],MaxColdRes91:[2,17],MaxLightningRes91:[2,18],MaxPoisonRes91:[2,19],
 MinionDamage:[3],MinionLife:[3],MinionSpeed:[3],MinionCrit:[3,7],MinionCritMulti:[3,7],MoveSpeed:[4],SkillLevel:[5],SpellInc:[6],Crit:[7],CritMulti:[7],AttackSpeed:[8],CastSpeed:[9],Mana:[10],ManaRegen:[10],
 FireAdded:[11],FireSpellAdded:[11],FireInc:[11],ColdAdded:[12],ColdSpellAdded:[12],ColdInc:[12],LightningAdded:[13],LightningSpellAdded:[13],LightningInc:[13],AttackLightning:[13],
 PhysInc:[14],PhysAdded:[14],AttackAdded:[14],PhysAsElem:[14],PoisonSpellAdded:[15],PoisonInc:[15],PoisonDamage:[15],IgniteDamage:[15],IgniteChance:[15],
 Str:[20],Dex:[20],Int:[20],Attributes:[20],DefenceFlat:[21],DefenceFlatEvasion:[21],DefenceFlatEnergyShield:[21],DefenceInc:[21],EnergyShieldGlobal:[21],
 LifeLeech:[22],ManaLeech:[22],EnergyShieldLeech:[22],LifeRegen:[22],LifeOnKill:[22],ManaOnKill:[22],Area:[23],BleedChance:[24],BleedDamage:[24],DotMulti:[24],CurseEffect:[25],CurseLimit:[25],CooldownRecovery:[26],VowEffect98:[27],AttackSpeedRing:[8],CastSpeedRing:[9],CastSpeedGloves:[9],RingMove:[4]};
const LEVEL={0:[0,1e9],1:[0,19],2:[0,39],3:[0,59],4:[0,74],5:[60,1e9],6:[75,1e9],7:[82,1e9]};
const RAR={0:"NMRU",1:"N",2:"M",3:"NM",4:"R",5:"RU"};
function typeMatch(t,it){
  if(it.kind==="misc")return false;
  switch(t){
    case 0:return it.kind!=="idol"&&it.kind!=="rune"; /* Any gear catches quivers (Patch 87) but not Dwarven Runes: those only match an explicit rule */ /* "Any gear" does not catch idols (game: tooltip named the Idols rule, not an earlier Any-gear rule) */
    case 1:return it.kind==="weapon";
    case 2:return["helm","chest","gloves","boots"].includes(it.kind);
    case 3:return["ring","amulet","belt"].includes(it.kind);
    case 4:return it.runebase;case 13:return it.core;case 15:return it.sockets4Plus;case 16:return it.truesworn;
    case 5:return it.kind==="helm";case 6:return it.kind==="chest";case 7:return it.kind==="gloves";case 8:return it.kind==="boots";
    case 9:return it.kind==="shield"||it.kind==="tome"||it.kind==="quiver";case 33:return it.kind==="rune";case 34:return it.kind==="quiver";case 10:return it.kind==="ring";case 11:return it.kind==="amulet";case 12:return it.kind==="belt";case 14:return it.kind==="idol";
    case 17:return false;
    default:{const sub={18:"bow",19:"claw",20:"dagger",21:"dual",22:"fist",23:"sword2h",24:"axe2h",25:"mace2h",26:"macesh",27:"axe1h",28:"mace1h",29:"sword1h",30:"scythe",31:"staff",32:"wand"}[t];return it.sub===sub;}
  }
}
const defOf=tags=>{const a=tags.includes("Armour"),e=tags.includes("Evasion"),z=tags.includes("EnergyShield");return a&&e?4:a&&z?5:e&&z?6:a?1:e?2:z?3:0;};
function rollOk(q,m){if(!q)return true;return q===1?m.tier<=2:m.tier<=1;}
function moreMatch(r,it){
  const t=+mval(r,"t")||0,n=+mval(r,"n")||0,s=+mval(r,"s")||0,g=+mval(r,"g")||0,gx=+mval(r,"gx")||0,rd=+mval(r,"r")||0,u=+mval(r,"u")||0;
  const k=+mval(r,"k")||0,dd=+mval(r,"d")||0;
  if(dd&&it.def!==dd)return false;
  const as=mlist(r,"a");
  /* t and n belong to the named lines when the rule has some (in-game test, Blood Reaver, 25.11.2026): t is checked on the named lines only, and n / Any N count the named lines that reach t (all named lines present when there is no t). Without named lines they run over every line on the item. k=1 only prefix lines, k=2 only suffix lines (confirmed in game). Top roll (quality) stays global: it is checked in matches(). */
  if(!as.length&&(t||n)){const c=it.mods.filter(m=>(!t||m.tier<=t)&&(!k||m.pre===k)).length;if(c<Math.max(1,n))return false;}
  if(s&&it.sock<s)return false;
  const[il,ih]=mrng(r,"i");if((il&&it.lvl<il)||(ih&&it.lvl>ih))return false;
  const[ql,qh]=mrng(r,"q");if((ql&&it.req<ql)||(qh&&it.req>qh))return false;
  if(g&&it.grade<g)return false;if(gx&&it.grade>=gx)return false;
  if(rd===1&&it.rar!=="U")return false;if(rd===2&&!(it.rar==="U"&&it.chase))return false;
  if(u===1&&it.unsworn)return false;if(u===2&&!it.unsworn)return false;
  const bs=mlist(r,"b");if(bs.length&&(mval(r,"nb")==="1"?bs.includes(it.baseId):!bs.includes(it.baseId)))return false;
  const rs=mlist(r,"rn");if(rs.length&&(mval(r,"nr")==="1"?rs.includes(it.redId):!rs.includes(it.redId)))return false;
  const hasL=id=>it.mods.some(m=>m.lineLabel&&m.lineLabel===LINEN[id]);
  if(as.length){
    const an=+mval(r,"an")||0,lim=t||n; /* k only narrows the lines while t or n is set, as before */
    const hit=id=>it.mods.some(m=>m.lineLabel&&m.lineLabel===LINEN[id]&&(!t||m.tier<=t)&&(!lim||!k||m.pre===k));
    const c=as.filter(hit).length;
    const ok=mval(r,"all")==="1"?c===as.length:c>=Math.max(1,an,n); /* All: every named line must reach t. Any: at least max(1, n, Any N) named lines do. */
    if(!ok)return false;
  }
  const nas=mlist(r,"na");if(nas.length&&nas.some(hasL))return false; /* "Not these lines": none of them may be on the item */
   /* named lines: "any of them" by default, "all of them" with all=1 (shown in the game) */
  return true;
}
function matches(r,it){
  const rt=+mval(r,"rt")||0;
  if(it.rune)return !!rt&&it.rtier<=rt;
  if(rt)return false;
  if(it.gem)return r.type===17&&r.rarity===0&&r.level===0&&!r.line&&!r.quality&&!r.count&&!r.m.length; /* decided (Mathies, 22.11.2026): Gems are only handled with Rarity Any and no other condition; the game export is 1,17,0,0,0,<action>,... */
  if(!RAR[r.rarity]||!RAR[r.rarity].includes(it.rar))return false;
  if(!typeMatch(r.type,it))return false;
  const lv=LEVEL[r.level]||LEVEL[0];
  if(it.lvl<lv[0]||it.lvl>lv[1])return false;
  if(r.line||r.quality||r.count){
    const n=it.mods.filter(m=>(!r.line||m.lines.includes(r.line))&&rollOk(r.quality,m)).length;
    if(n<r.count+1)return false;
  }
  return moreMatch(r,it);
}
/* game texts (exe, Patch 87): "Gems show unless a Gems rule hides them", and a gem under a Sell rule is sold on landing (SellGems113). Uniques, runes, Dwarven Runes, currency, gold and flasks are never hidden or sold. */
const NEVER_HIDDEN=it=>it.rar==="U"||(it.kind==="misc"&&!it.gem);
/* Drop Test source: in Easy Mode the Easy preview rules (when they fit the rule limit), otherwise the active filter F. Cached per REV. */
const SIM={rev:-1,m:"",rules:null,easy:false,n:0};
function simRules(){
  const em=typeof EZ!=="undefined"&&!!EZ&&EZ.m==="easy",k=em?"e":"a";
  if(SIM.rules&&SIM.rev===REV&&SIM.m===k)return SIM;
  SIM.rev=REV;SIM.m=k;SIM.rules=F.rules;SIM.easy=false;SIM.n=0;
  if(em){try{const g=easyGen(EZ.s);SIM.n=g.rules.length;if(g.rules.length<=MAX_RULES){SIM.rules=g.rules;SIM.easy=true;}}catch(e){}}
  return SIM;
}
function evaluate(it){
  const RL=simRules().rules;
  for(let i=0;i<RL.length;i++){
    const r=RL[i];if(!r.on)continue;
    if(matches(r,it)){
      if((r.action===0||r.action===4)&&NEVER_HIDDEN(it))return{v:1,i,guard:true,col:r.colour};
      return{v:r.action,i,col:r.colour};
    }
  }
  return{v:1,i:-1,col:0};
}

/* evaluation cache: results are reused until a rule changes (REV goes up) */
let REV=0;
const evalC=it=>{if(it._rv!==REV){it._e=evaluate(it);it._rv=REV;}return it._e;};

/* sample drops: real names, levels, tags and affix groups from the Broken Oath game files (build 87, a local install read on 22.11.2026; the public API still had build 86 on 22.11.2026).
   What is NOT from the API: how often each base drops, how tiers are rolled, how many mods an item gets,
   which affix group belongs to which line group (LINEMAP) and whether unique mods count for line rules. */
const ARM={
 plate:{tag:"Armour",chest:"Plate Vest|Riveted Cuirass|Iron Hauberk|Steel Cuirass|Knight's Plate|Templar Plate|Warden Plate|Oathkeeper Plate|Titan Plate",helm:"Iron Cap|Riveted Helm|Barbute|Sallet|Knight's Helm|Templar Helm|Warden Helm|Oathkeeper Helm|Titan Greathelm",gloves:"Iron Gauntlets|Riveted Gauntlets|Plated Gauntlets|Steel Gauntlets|Knight's Gauntlets|Templar Gauntlets|Warden Gauntlets|Oathkeeper Gauntlets|Titan Gauntlets",boots:"Iron Greaves|Riveted Greaves|Plated Greaves|Steel Greaves|Knight's Greaves|Templar Greaves|Warden Greaves|Oathkeeper Greaves|Titan Greaves"},
 leather:{tag:"Evasion",chest:"Shabby Jerkin|Woodsman's Jerkin|Hunter's Vest|Tracker's Vest|Ranger's Coat|Shadow Leathers|Wildwood Garb|Nightstalker Garb|Phantom Coat",helm:"Leather Band|Braided Band|Hunter's Band|Tracker's Band|Ranger's Circlet|Shadow Circlet|Wildwood Circlet|Nightstalker Circlet|Phantom Circlet",gloves:"Rawhide Gloves|Woodsman's Gloves|Hunter Gloves|Tracker Gloves|Ranger Gloves|Shadow Gloves|Wildwood Gloves|Nightstalker Gloves|Phantom Grips",boots:"Rawhide Boots|Woodsman's Boots|Hunter Boots|Tracker Boots|Ranger Boots|Shadow Boots|Wildwood Boots|Nightstalker Boots|Phantom Treads"},
 silk:{tag:"EnergyShield",chest:"Simple Robe|Chapel Robe|Silken Vest|Embroidered Robe|Scholar's Robe|Runed Vestment|Sage's Robe|Archon Vestment|Astral Robe",helm:"Copper Circlet|Chapel Circlet|Silver Circlet|Moonsilver Circlet|Scholar's Circlet|Runed Circlet|Sage's Crown|Archon Crown|Astral Diadem",gloves:"Wool Gloves|Chapel Gloves|Silken Gloves|Embroidered Gloves|Scholar's Gloves|Runed Gloves|Sage's Gloves|Archon Gloves|Astral Gloves",boots:"Wool Shoes|Chapel Shoes|Silken Slippers|Embroidered Slippers|Scholar's Boots|Runed Boots|Sage's Boots|Archon Boots|Astral Slippers"},
 brigandine:{tag:"Armour,Evasion",chest:"Scale Vest|Studded Vest|Brigandine|Sellsword's Coat|Field Lamellar|Wyrmscale Coat|Marshal's Brigandine|General's Brigandine|Dragonscale Coat",helm:"Scale Cap|Studded Cap|Brigand Helm|Sellsword's Helm|Lamellar Helm|Wyrmscale Helm|Marshal's Helm|General's Helm|Dragonscale Helm",gloves:"Scale Gloves|Studded Gloves|Brigand Gloves|Sellsword's Gloves|Lamellar Gloves|Wyrmscale Gloves|Marshal's Gloves|General's Gloves|Dragonscale Gloves",boots:"Scale Boots|Studded Boots|Brigand Boots|Sellsword's Boots|Lamellar Boots|Wyrmscale Boots|Marshal's Boots|General's Boots|Dragonscale Boots"},
 chain:{tag:"Armour,EnergyShield",chest:"Chain Shirt|Patched Mail|Ringmail Coat|Chaplain's Mail|Chainmail Hauberk|Saint's Mail|Crusader Mail|Hallowed Mail|Seraph Mail",helm:"Chain Coif|Patched Coif|Ringmail Coif|Chaplain's Coif|Chainmail Helm|Saint's Coif|Crusader Helm|Hallowed Helm|Seraph Helm",gloves:"Chain Gloves|Patched Mitts|Ringmail Gloves|Chaplain's Gloves|Chainmail Gloves|Saint's Gloves|Crusader Gloves|Hallowed Gloves|Seraph Gloves",boots:"Chain Boots|Patched Boots|Ringmail Boots|Chaplain's Boots|Chainmail Boots|Saint's Boots|Crusader Boots|Hallowed Boots|Seraph Boots"},
 ritual:{tag:"Evasion,EnergyShield",chest:"Padded Wrap|Bone Wrap|Mystic Wrap|Augur's Wrap|Ritual Garb|Occultist Wrap|Hexweave Garb|Witchweave Robe|Voidweave Garb",helm:"Twine Band|Bone Band|Mystic Band|Augur's Band|Ritual Diadem|Occultist Diadem|Hexweave Diadem|Witchweave Diadem|Voidweave Diadem",gloves:"Padded Wraps|Bone Wraps|Mystic Wraps|Augur's Wraps|Ritual Wraps|Occultist Wraps|Hexweave Wraps|Witchweave Wraps|Voidweave Wraps",boots:"Padded Boots|Bone Boots|Mystic Boots|Augur's Boots|Ritual Boots|Occultist Boots|Hexweave Boots|Witchweave Boots|Voidweave Boots"}
};
const ARM_N=[1,8,2,9,3,4,5,6,7],ARM_L=[1,4,10,18,28,40,54,68,82];
/* id|name|level per line; kind,sub,tags in the header */
const BASE_SRC=[
 ["weapon","bow","Weapon,Ranged,TwoHand,Attack,Bow","bow_1|Hunter's Bow|1;bow_2|Ashwood Shortbow|4;bow_3|Sylvan Longbow|10;bow_4|Recurve Bow|18;bow_5|Thornwood Bow|28;bow_6|Elven Warbow|40;bow_7|Moonlit Bow|54;bow_8|Stormwing Bow|68;bow_9|Starfall Bow|82"],
 ["weapon","dual","Weapon,Melee,Attack,DualBlades,Sword","blades_1|Ronin Blades (Old Pair)|1;blades_2|Twin Fangs (Old Pair)|6;blades_3|Moonlit Pair (Old Pair)|14;blades_4|Shadow Edges (Old Pair)|24;blades_5|Wanderer's Pair (Old Pair)|36;blades_6|Crescent Pair (Old Pair)|50;blades_7|Kensei Blades (Old Pair)|66;blades_8|Storm Pair (Old Pair)|80"],
 ["weapon","sword2h","Weapon,Melee,TwoHand,Attack,Greatsword,Sword","greatsword_1|Rusted Greatsword|1;greatsword_8|Militia Greatsword|4;greatsword_10|Bastard Sword|7;greatsword_2|Iron Greatsword|10;greatsword_9|Steel Greatsword|18;greatsword_3|Knight's Greatsword|28;greatsword_11|Executioner's Blade|34;greatsword_4|Templar Greatsword|40;greatsword_5|Warden Blade|54;greatsword_12|Highland Claymore|61;greatsword_6|Oathkeeper Blade|68;greatsword_7|Titan Edge|82;greatspear_1|Hunting Spear|3;greatspear_2|Boar Spear|14;greatspear_3|Pike|30;greatspear_4|Partisan|44;greatspear_5|Glaive Spear|60;greatspear_6|Oathlance|76"],
 ["weapon","axe2h","Weapon,Melee,TwoHand,Attack,Greatsword,Axe","greataxe_1|Woodcutter's Axe|2;greataxe_2|Bearded Axe|12;greataxe_3|Broad Axe|22;greataxe_4|War Axe|33;greataxe_5|Reaver Axe|46;greataxe_6|Hewing Axe|58;greataxe_7|Doom Axe|72"],
 ["weapon","mace2h","Weapon,Melee,TwoHand,Attack,Greatsword,Mace","greatmace_1|Spiked Club|5;greatmace_2|Iron Maul|15;greatmace_3|Morning Star|26;greatmace_4|Warhammer|38;greatmace_5|Great Mace|50;greatmace_6|Dread Hammer|64;greatmace_7|Siege Maul|78"],
 ["weapon","macesh","Weapon,Melee,Attack,MaceShield,Mace","maceshield_1|Squire's Mace (Old Pair)|1;maceshield_2|Oathkeeper Mace (Old Pair)|6;maceshield_3|Templar's Maul (Old Pair)|14;maceshield_4|Dawnbreaker (Old Pair)|24;maceshield_5|Bastion Hammer (Old Pair)|36;maceshield_6|Crusader's Star (Old Pair)|50;maceshield_7|Sunforged Mace (Old Pair)|66;maceshield_8|Heaven's Anvil (Old Pair)|80"],
 ["weapon","scythe","Weapon,Melee,TwoHand,Attack,Scythe","scythe_1|Gravedigger's Scythe|1;scythe_2|Widowmaker|6;scythe_3|Crypt Scythe|14;scythe_4|Bone Reaper|26;scythe_5|Grim Scythe|40;scythe_6|Gloom Scythe|56;scythe_7|Deathless Reaper|74"],
 ["weapon","staff","Weapon,Caster,TwoHand,Staff","staff_1|Driftwood Staff|1;staff_8|Birch Staff|4;staff_10|Thornwood Staff|7;staff_2|Gnarled Staff|10;staff_9|Ashwood Staff|18;staff_11|Bone Staff|23;staff_3|Quarterstaff|28;staff_12|Serpent Staff|34;staff_4|Runed Staff|40;staff_13|Ember Staff|47;staff_5|Moon Staff|54;staff_14|Storm Staff|61;staff_6|Eclipse Staff|68;staff_15|Void Staff|75;staff_7|Astral Staff|82"],
 ["weapon","sword1h","Weapon,OneHand,Attack,OneHandSword,Melee,Sword","sword1h_1|Ronin Blade|1;sword1h_2|Arming Sword|6;sword1h_3|Moonlit Blade|14;sword1h_4|Shadow Edge|24;sword1h_5|Wanderer's Blade|36;sword1h_6|Elven Sabre|44;sword1h_7|Crescent Blade|50;sword1h_8|Kensei Blade|66;sword1h_9|Storm Edge|80;katana_1|Drifter Katana|3;katana_2|Reed Katana|9;katana_3|Tide Katana|16;katana_4|Falcon Katana|21;katana_5|Dusk Katana|28;katana_6|Wolfsbane Katana|33;katana_7|Ember Katana|40;katana_8|Ringed Katana|48;katana_9|Frostveil Katana|56;katana_10|Nightfall Katana|62;katana_11|Dragonbone Katana|72"],
 ["weapon","axe1h","Weapon,OneHand,Attack,OneHandAxe,Melee,Axe","axe1h_1|Hatchet|2;axe1h_2|Bearded Hatchet|10;axe1h_3|Raider's Axe|18;axe1h_4|Wolf Axe|28;axe1h_5|Runed Hatchet|40;axe1h_6|Elven Axe|52;axe1h_7|Jarl's Axe|64;axe1h_8|Doom Hatchet|78;axe1h_9|Splitting Axe|6;axe1h_10|Ashen Cleaver|22;axe1h_11|Ironbark Axe|34;axe1h_12|Warden's Axe|46;axe1h_13|Ember Cleaver|58;axe1h_14|Gloomreaver|70;axe1h_15|Oathsplitter|80"],
 ["weapon","mace1h","Weapon,OneHand,Attack,OneHandMace,Melee,Mace","mace1h_1|Squire's Mace|1;mace1h_2|Oathkeeper Mace|6;mace1h_3|Templar's Maul|14;mace1h_4|Dawnbreaker|24;mace1h_5|Bastion Hammer|36;mace1h_6|Crusader's Star|50;mace1h_7|Sunforged Mace|66;mace1h_8|Heaven's Anvil|80;mace1h_9|Cudgel|3;mace1h_10|Ironbound Club|20;mace1h_11|Bellringer's Hammer|30;mace1h_12|Gravewarden|44;mace1h_13|Dreadmaul|72"],
 ["weapon","dagger","Weapon,OneHand,Attack,Dagger,Melee","dagger_1|Skinning Knife|1;dagger_2|Stiletto|8;dagger_3|Elven Dirk|16;dagger_4|Moonfang|26;dagger_5|Kris|38;dagger_6|Ghost Knife|50;dagger_7|Nightfang|64;dagger_8|Vowcutter|78"],
 ["weapon","dagger","Weapon,OneHand,Attack,Dagger,Melee,RuneDagger","rune_dagger_1|Runed Kris|38;rune_dagger_2|Glyph Athame|64;rune_dagger_3|Sigilfang|78"],
 ["weapon","claw","Weapon,OneHand,Attack,Claw,Melee,Martial","claw_1|Iron Talons|2;claw_2|Tiger Claws|12;claw_3|Wolfhook|22;claw_4|Shadow Talons|34;claw_5|Wyrm Claws|48;claw_6|Gutting Claws|62;claw_7|Eclipse Talons|76"],
 ["weapon","fist","Weapon,OneHand,Attack,Fist,Melee,Martial","fist_1|Iron Knuckles|3;fist_2|Spiked Gauntlets|18;fist_3|Brawler's Fists|30;fist_4|Jade Gauntlets|42;fist_5|Night Knuckles|56;fist_6|Voidfists|74"],
 ["weapon","wand","Weapon,OneHand,Caster,Wand","wand_1|Birch Wand|2;wand_2|Bone Wand|10;wand_3|Crystal Wand|20;wand_4|Runed Wand|32;wand_5|Serpent Wand|46;wand_6|Moon Wand|60;wand_7|Void Wand|76"],
 ["shield","","Shield,Defences","shield_1|Blackiron Shield|1|Armour;shield_2|Hide Buckler|3|Evasion;shield_3|Chapel Ward|5|EnergyShield;shield_4|Heater Shield|12|Armour;shield_5|Elven Buckler|16|Evasion;shield_6|Runed Ward|20|EnergyShield;shield_7|Kite Shield|28|Armour;shield_8|Spiked Buckler|34|Evasion;shield_9|Sanctified Ward|40|EnergyShield;shield_10|Pavise|46|Armour;shield_11|Wyrmscale Buckler|56|Evasion;shield_12|Archon Ward|62|EnergyShield;shield_13|Bastion Shield|70|Armour;shield_14|Phantom Buckler|76|Evasion;shield_15|Seraph Ward|80|EnergyShield"],
 ["tome","","Tome,Caster,EnergyShield,Defences","tome_1|Primer|1;tome_2|Hymnal|12;tome_3|Grimoire|26;tome_4|Codex of Storms|44;tome_5|Astral Codex|66;tome_6|Vellum Folio|8;tome_7|Psalter|19;tome_8|Black Ledger|35;tome_9|Oathbound Missal|52;tome_10|Runewright Compendium|60;tome_11|Ember Codex|74"],
 ["quiver","","Quiver","hunters_quiver|Hunter's Quiver|1;fletchers_quiver|Fletcher's Quiver|8;broadhead_quiver|Broadhead Quiver|18;sylvan_quiver|Sylvan Quiver|30;stormfeather_quiver|Stormfeather Quiver|45;volley_quiver|Volley Quiver|60"],
 ["ring","","Jewellery,Ring","iron_ring|Iron Ring|1;garnet_ring|Garnet Ring|2;ruby_ring|Ruby Ring|4;pearl_ring|Pearl Ring|6;copper_band|Copper Band|9;sapphire_ring|Sapphire Ring|12;topaz_ring|Topaz Ring|16;moonsilver_ring|Moonsilver Ring|20;stormglass_ring|Opaline Ring|24;amethyst_ring|Amethyst Ring|30;steel_signet|Steel Signet|34;twostone_ring|Two-Stone Ring|40;rune_ring|Rune Ring|44;diamond_ring|Diamond Ring|50;bloodstone_ring|Bloodstone Ring|58;prismatic_ring|Prismatic Ring|64;cinderstone_ring|Cinderstone Ring|72;heartblood_ring|Heartblood Ring|80"],
 ["amulet","","Jewellery,Amulet","coral_amulet|Coral Amulet|1;amber_amulet|Amber Amulet|3;jade_amulet|Jade Amulet|3;lapis_amulet|Lapis Amulet|3;bone_talisman|Bone Talisman|6;moonstone_amulet|Moonstone Amulet|16;onyx_amulet|Onyx Amulet|24;seer_pendant|Mystic Pendant|28;agate_amulet|Agate Amulet|34;citrine_amulet|Citrine Amulet|44;turquoise_amulet|Turquoise Amulet|44;sunstone_amulet|Sunstone Amulet|52;duskstone_amulet|Duskstone Amulet|60;veilglass_amulet|Veilglass Amulet|68;emberglow_amulet|Emberglow Amulet|76"],
 ["belt","","Belt","leather_belt|Leather Belt|1;rope_cord|Rope Cord|3;heavy_belt|Heavy Belt|10;studded_belt|Studded Belt|14;chain_belt|Chain Belt|20;rustic_sash|Rustic Sash|30;crystal_belt|Crystal Belt|40;bloodbound_girdle|Bloodbound Girdle|48;vanguard_belt|Vanguard Belt|56;veilsilk_cord|Veilsilk Cord|62;ironwarden_girdle|Ironwarden Girdle|66;wardweave_sash|Wardweave Sash|72;oathbound_girdle|Oathbound Girdle|78"],
 ["idol","","Idol","idol_pebble|Pebble Idol|20|Idol1;idol_chisel|Chisel Idol|20|Idol2;idol_ingot|Ingot Idol|20|Idol2;idol_pick|Pick Idol|20|Idol3;idol_seam|Seam Idol|20|Idol3;idol_pillar|Pillar Idol|20|Idol4;idol_tunnel|Tunnel Idol|20|Idol4;idol_ancestor|Ancestor Idol|20|IdolGrand"]
];
const BASES=[],BASE_BY_ID={};
function addBase(id,name,kind,sub,lvl,tags){const b={id,name,kind,sub,lvl,tags:tags.split(",").filter(Boolean)};BASES.push(b);BASE_BY_ID[id]=b;}
BASE_SRC.forEach(([kind,sub,tags,rows])=>rows.split(";").forEach(r=>{const p=r.split("|");addBase(p[0],p[1],kind,sub,+p[2],tags+(p[3]?","+p[3]:""));}));
Object.keys(ARM).forEach(f=>["chest","helm","gloves","boots"].forEach(s=>{const names=ARM[f][s].split("|");names.forEach((n,i)=>addBase(f+"_"+s+"_"+ARM_N[i],n,s,"",ARM_L[i],s[0].toUpperCase()+s.slice(1)+","+ARM[f].tag+",Defences"));}));
/* more bases from the game files. Ashen and Core Touched variants (id|name|base|level) are never picked as a base of their own:
   a normal drop sometimes becomes one. Special bases (Gnome-made jewellery) drop rarely. */
const VAR_SRC=`ct_proj_bow_8|Core Touched Stormwing Bow|bow_8|68
ct_proj_bow_9|Core Touched Starfall Bow|bow_9|82
ct_chain_wand_6|Core Touched Moon Wand|wand_6|60
ct_chain_wand_7|Core Touched Void Wand|wand_7|76
ct_gems_staff_15|Core Touched Void Staff|staff_15|75
ct_gems_staff_7|Core Touched Astral Staff|staff_7|82
ct_minion_sunstone_amulet|Core Touched Sunstone Amulet|sunstone_amulet|52
ct_minion_emberglow_amulet|Core Touched Emberglow Amulet|emberglow_amulet|76
ct_poison_bloodstone_ring|Core Touched Bloodstone Ring|bloodstone_ring|58
ct_poison_prismatic_ring|Core Touched Prismatic Ring|prismatic_ring|64
ct_traps_leather_gloves_6|Core Touched Nightstalker Gloves|leather_gloves_6|68
ct_traps_leather_gloves_7|Core Touched Phantom Grips|leather_gloves_7|82
ct_trapnet_leather_boots_6|Core Touched Nightstalker Boots|leather_boots_6|68
ct_trapnet_leather_boots_7|Core Touched Phantom Treads|leather_boots_7|82
ct_bastion_plate_chest_6|Core Touched Oathkeeper Plate|plate_chest_6|68
ct_bastion_plate_chest_7|Core Touched Titan Plate|plate_chest_7|82
ct_veil_leather_chest_6|Core Touched Nightstalker Garb|leather_chest_6|68
ct_veil_leather_chest_7|Core Touched Phantom Coat|leather_chest_7|82
ct_aegis_silk_chest_6|Core Touched Archon Vestment|silk_chest_6|68
ct_aegis_silk_chest_7|Core Touched Astral Robe|silk_chest_7|82
ct_sunder_greatsword_6|Core Touched Oathkeeper Blade|greatsword_6|68
ct_sunder_greatsword_7|Core Touched Titan Edge|greatsword_7|82
ct_quake_greatmace_6|Core Touched Dread Hammer|greatmace_6|64
ct_quake_greatmace_7|Core Touched Siege Maul|greatmace_7|78
ct_reave_greataxe_6|Core Touched Hewing Axe|greataxe_6|58
ct_reave_greataxe_7|Core Touched Doom Axe|greataxe_7|72
ct_reap_scythe_6|Core Touched Gloom Scythe|scythe_6|56
ct_reap_scythe_7|Core Touched Deathless Reaper|scythe_7|74
ct_duel_sword1h_8|Core Touched Kensei Blade|sword1h_8|66
ct_duel_sword1h_9|Core Touched Storm Edge|sword1h_9|80
ct_tremor_mace1h_7|Core Touched Sunforged Mace|mace1h_7|66
ct_tremor_mace1h_8|Core Touched Heaven's Anvil|mace1h_8|80
ct_venom_dagger_7|Core Touched Nightfang|dagger_7|64
ct_venom_dagger_8|Core Touched Vowcutter|dagger_8|78
ct_hex_silk_helm_6|Core Touched Archon Crown|silk_helm_6|68
ct_hex_silk_helm_7|Core Touched Astral Diadem|silk_helm_7|82
ct_warcry_plate_helm_6|Core Touched Oathkeeper Helm|plate_helm_6|68
ct_warcry_plate_helm_7|Core Touched Titan Greathelm|plate_helm_7|82
ct_totem_bloodbound_girdle|Core Touched Bloodbound Girdle|bloodbound_girdle|48
ct_totem_vanguard_belt|Core Touched Vanguard Belt|vanguard_belt|56
ct_volley_stormfeather_quiver|Core Touched Stormfeather Quiver|stormfeather_quiver|45
ct_volley_volley_quiver|Core Touched Volley Quiver|volley_quiver|60
ct_rampart_shield_14|Core Touched Phantom Buckler|shield_14|76
ct_rampart_shield_15|Core Touched Seraph Ward|shield_15|80
ct_lore_tome_4|Core Touched Codex of Storms|tome_4|44
ct_lore_tome_5|Core Touched Astral Codex|tome_5|66
ash_bow_7|Ashen Moonlit Bow|bow_7|54
ash_bow_8|Ashen Stormwing Bow|bow_8|68
ash_bow_9|Ashen Starfall Bow|bow_9|82
ash_greatmace_5|Ashen Great Mace|greatmace_5|50
ash_greatsword_5|Ashen Warden Blade|greatsword_5|54
ash_greataxe_6|Ashen Hewing Axe|greataxe_6|58
ash_greatsword_12|Ashen Highland Claymore|greatsword_12|61
ash_greatmace_6|Ashen Dread Hammer|greatmace_6|64
ash_greatsword_6|Ashen Oathkeeper Blade|greatsword_6|68
ash_greataxe_7|Ashen Doom Axe|greataxe_7|72
ash_greatmace_7|Ashen Siege Maul|greatmace_7|78
ash_greatsword_7|Ashen Titan Edge|greatsword_7|82
ash_scythe_6|Ashen Gloom Scythe|scythe_6|56
ash_scythe_7|Ashen Deathless Reaper|scythe_7|74
ash_staff_5|Ashen Moon Staff|staff_5|54
ash_staff_14|Ashen Storm Staff|staff_14|61
ash_staff_6|Ashen Eclipse Staff|staff_6|68
ash_staff_15|Ashen Void Staff|staff_15|75
ash_staff_7|Ashen Astral Staff|staff_7|82
ash_plate_chest_5|Ashen Warden Plate|plate_chest_5|54
ash_plate_chest_6|Ashen Oathkeeper Plate|plate_chest_6|68
ash_plate_chest_7|Ashen Titan Plate|plate_chest_7|82
ash_plate_helm_5|Ashen Warden Helm|plate_helm_5|54
ash_plate_helm_6|Ashen Oathkeeper Helm|plate_helm_6|68
ash_plate_helm_7|Ashen Titan Greathelm|plate_helm_7|82
ash_leather_chest_5|Ashen Wildwood Garb|leather_chest_5|54
ash_leather_chest_6|Ashen Nightstalker Garb|leather_chest_6|68
ash_leather_chest_7|Ashen Phantom Coat|leather_chest_7|82
ash_leather_helm_5|Ashen Wildwood Circlet|leather_helm_5|54
ash_leather_helm_6|Ashen Nightstalker Circlet|leather_helm_6|68
ash_leather_helm_7|Ashen Phantom Circlet|leather_helm_7|82
ash_silk_chest_5|Ashen Sage's Robe|silk_chest_5|54
ash_silk_chest_6|Ashen Archon Vestment|silk_chest_6|68
ash_silk_chest_7|Ashen Astral Robe|silk_chest_7|82
ash_silk_helm_5|Ashen Sage's Crown|silk_helm_5|54
ash_silk_helm_6|Ashen Archon Crown|silk_helm_6|68
ash_silk_helm_7|Ashen Astral Diadem|silk_helm_7|82
ash_brigandine_chest_5|Ashen Marshal's Brigandine|brigandine_chest_5|54
ash_brigandine_chest_6|Ashen General's Brigandine|brigandine_chest_6|68
ash_brigandine_chest_7|Ashen Dragonscale Coat|brigandine_chest_7|82
ash_brigandine_helm_5|Ashen Marshal's Helm|brigandine_helm_5|54
ash_brigandine_helm_6|Ashen General's Helm|brigandine_helm_6|68
ash_brigandine_helm_7|Ashen Dragonscale Helm|brigandine_helm_7|82
ash_chain_chest_5|Ashen Crusader Mail|chain_chest_5|54
ash_chain_chest_6|Ashen Hallowed Mail|chain_chest_6|68
ash_chain_chest_7|Ashen Seraph Mail|chain_chest_7|82
ash_chain_helm_5|Ashen Crusader Helm|chain_helm_5|54
ash_chain_helm_6|Ashen Hallowed Helm|chain_helm_6|68
ash_chain_helm_7|Ashen Seraph Helm|chain_helm_7|82
ash_ritual_chest_5|Ashen Hexweave Garb|ritual_chest_5|54
ash_ritual_chest_6|Ashen Witchweave Robe|ritual_chest_6|68
ash_ritual_chest_7|Ashen Voidweave Garb|ritual_chest_7|82
ash_ritual_helm_5|Ashen Hexweave Diadem|ritual_helm_5|54
ash_ritual_helm_6|Ashen Witchweave Diadem|ritual_helm_6|68
ash_ritual_helm_7|Ashen Voidweave Diadem|ritual_helm_7|82
ash_sword1h_7|Ashen Crescent Blade|sword1h_7|50
ash_sword1h_8|Ashen Kensei Blade|sword1h_8|66
ash_sword1h_9|Ashen Storm Edge|sword1h_9|80
ash_axe1h_6|Ashen Elven Axe|axe1h_6|52
ash_axe1h_7|Ashen Jarl's Axe|axe1h_7|64
ash_axe1h_8|Ashen Doom Hatchet|axe1h_8|78
ash_mace1h_6|Ashen Crusader's Star|mace1h_6|50
ash_mace1h_7|Ashen Sunforged Mace|mace1h_7|66
ash_mace1h_8|Ashen Heaven's Anvil|mace1h_8|80
ash_dagger_6|Ashen Ghost Knife|dagger_6|50
ash_dagger_7|Ashen Nightfang|dagger_7|64
ash_dagger_8|Ashen Vowcutter|dagger_8|78
ash_claw_6|Ashen Gutting Claws|claw_6|62
ash_claw_7|Ashen Eclipse Talons|claw_7|76
ash_fist_5|Ashen Night Knuckles|fist_5|56
ash_fist_6|Ashen Voidfists|fist_6|74
ash_wand_6|Ashen Moon Wand|wand_6|60
ash_wand_7|Ashen Void Wand|wand_7|76
ash_shield_11|Ashen Wyrmscale Buckler|shield_11|56
ash_shield_12|Ashen Archon Ward|shield_12|62
ash_shield_13|Ashen Bastion Shield|shield_13|70
ash_shield_14|Ashen Phantom Buckler|shield_14|76
ash_shield_15|Ashen Seraph Ward|shield_15|80
ash_tome_5|Ashen Astral Codex|tome_5|66
ct_rend_claw_6|Core Touched Gutting Claws|claw_6|62
ct_rend_claw_7|Core Touched Eclipse Talons|claw_7|76
ct_cleave_axe1h_7|Core Touched Jarl's Axe|axe1h_7|64
ct_cleave_axe1h_8|Core Touched Doom Hatchet|axe1h_8|78
ct_knuckle_fist_5|Core Touched Night Knuckles|fist_5|56
ct_knuckle_fist_6|Core Touched Voidfists|fist_6|74
ct_bulwark_plate_gloves_6|Core Touched Oathkeeper Gauntlets|plate_gloves_6|68
ct_bulwark_plate_gloves_7|Core Touched Titan Gauntlets|plate_gloves_7|82
ct_march_plate_boots_6|Core Touched Oathkeeper Greaves|plate_boots_6|68
ct_march_plate_boots_7|Core Touched Titan Greaves|plate_boots_7|82
ct_malice_silk_gloves_6|Core Touched Archon Gloves|silk_gloves_6|68
ct_malice_silk_gloves_7|Core Touched Astral Gloves|silk_gloves_7|82
ct_rime_silk_boots_6|Core Touched Archon Boots|silk_boots_6|68
ct_rime_silk_boots_7|Core Touched Astral Slippers|silk_boots_7|82
ct_linger_leather_helm_6|Core Touched Nightstalker Circlet|leather_helm_6|68
ct_linger_leather_helm_7|Core Touched Phantom Circlet|leather_helm_7|82
ct_vigil_chain_helm_6|Core Touched Hallowed Helm|chain_helm_6|68
ct_vigil_chain_helm_7|Core Touched Seraph Helm|chain_helm_7|82
ct_mercy_chain_chest_6|Core Touched Hallowed Mail|chain_chest_6|68
ct_mercy_chain_chest_7|Core Touched Seraph Mail|chain_chest_7|82
ct_standard_chain_gloves_6|Core Touched Hallowed Gloves|chain_gloves_6|68
ct_standard_chain_gloves_7|Core Touched Seraph Gloves|chain_gloves_7|82
ct_wellspring_chain_boots_6|Core Touched Hallowed Boots|chain_boots_6|68
ct_wellspring_chain_boots_7|Core Touched Seraph Boots|chain_boots_7|82
ct_frenzy_brigandine_helm_6|Core Touched General's Helm|brigandine_helm_6|68
ct_frenzy_brigandine_helm_7|Core Touched Dragonscale Helm|brigandine_helm_7|82
ct_brawn_brigandine_chest_6|Core Touched General's Brigandine|brigandine_chest_6|68
ct_brawn_brigandine_chest_7|Core Touched Dragonscale Coat|brigandine_chest_7|82
ct_quarry_brigandine_gloves_6|Core Touched General's Gloves|brigandine_gloves_6|68
ct_quarry_brigandine_gloves_7|Core Touched Dragonscale Gloves|brigandine_gloves_7|82
ct_thrift_brigandine_boots_6|Core Touched General's Boots|brigandine_boots_6|68
ct_thrift_brigandine_boots_7|Core Touched Dragonscale Boots|brigandine_boots_7|82
ct_storm_ritual_helm_6|Core Touched Witchweave Diadem|ritual_helm_6|68
ct_storm_ritual_helm_7|Core Touched Voidweave Diadem|ritual_helm_7|82
ct_hourglass_ritual_chest_6|Core Touched Witchweave Robe|ritual_chest_6|68
ct_hourglass_ritual_chest_7|Core Touched Voidweave Garb|ritual_chest_7|82
ct_frost_ritual_gloves_6|Core Touched Witchweave Wraps|ritual_gloves_6|68
ct_frost_ritual_gloves_7|Core Touched Voidweave Wraps|ritual_gloves_7|82
ct_bough_ritual_boots_6|Core Touched Witchweave Boots|ritual_boots_6|68
ct_bough_ritual_boots_7|Core Touched Voidweave Boots|ritual_boots_7|82
ash_rune_dagger_2|Ashen Glyph Athame|rune_dagger_2|64
ash_rune_dagger_3|Ashen Sigilfang|rune_dagger_3|78
ash_axe1h_13|Ashen Ember Cleaver|axe1h_13|58
ash_axe1h_14|Ashen Gloomreaver|axe1h_14|70
ash_axe1h_15|Ashen Oathsplitter|axe1h_15|80
ash_mace1h_13|Ashen Dreadmaul|mace1h_13|72
ash_greatspear_5|Ashen Glaive Spear|greatspear_5|60
ash_greatspear_6|Ashen Oathlance|greatspear_6|76
ash_katana_9|Ashen Frostveil Katana|katana_9|56
ash_katana_10|Ashen Nightfall Katana|katana_10|62
ash_katana_11|Ashen Dragonbone Katana|katana_11|72
ash_tome_9|Ashen Oathbound Missal|tome_9|52
ash_tome_10|Ashen Runewright Compendium|tome_10|60
ash_tome_11|Ashen Ember Codex|tome_11|74`;
const VARIANTS={},VAR_IDS=[],SPECIAL=[];
VAR_SRC.split("\n").forEach(l=>{const p=l.split("|"),par=BASE_BY_ID[p[2]];if(!par)return;const ash=p[0].startsWith("ash_"),v={id:p[0],name:p[1],kind:par.kind,sub:par.sub,lvl:+p[3],tags:par.tags.concat([ash?"Ashen":"CoreTouched"]),variant:ash?"ash":"ct"};BASE_BY_ID[v.id]=v;VAR_IDS.push(v.id);(VARIANTS[p[2]]=VARIANTS[p[2]]||[]).push(v);});
"gm_mainspring_ring|Mainspring Ring|ring|60;gm_cogwheel_ring|Cogwheel Ring|ring|60;gm_ratchet_band|Ratchet Band|ring|60;gm_escapement|Escapement Amulet|amulet|60;gm_hoarder_locket|Hoarder's Locket|amulet|60;gm_flywheel_belt|Flywheel Belt|belt|60".split(";").forEach(r=>{const p=r.split("|");const b={id:p[0],name:p[1],kind:p[2],sub:"",lvl:+p[3],tags:["Jewellery",p[2]==="ring"?"Ring":p[2]==="amulet"?"Amulet":"Belt"],variant:"special"};BASE_BY_ID[b.id]=b;SPECIAL.push(b);});
BASE_BY_ID.dwarven_rune={id:"dwarven_rune",name:"Dwarven Rune",kind:"rune",sub:"",lvl:70,tags:["DwarvenRune"]};
/* red uniques that are chase reds in the game files */
const CHASE=new Set(["Oathbreaker", "The First Vow", "Crown of the Bone King", "Hand of Dawn", "Stormstring", "Crown of the Unbroken", "Heart of the Rupture", "Stride of the First Oath", "The Mirror Oath", "The Last Feast", "The Hollow Star", "Ashbrand of the Tyrant", "The Regent's Thirst", "Oath of the Last Jarl", "Hoarfrost Signet", "The Glacier's Oath", "Rime of the Long Watch", "Grasp of the Sworn", "The Keeper's Ember", "Shard of the Fourth Spark", "Mardoth's Last Pebble", "Ninefold Quiver", "The Sundered Vow", "Debtor's Maul", "Starless Crown", "The Debt Collector", "Heart of Entropy", "Silent Scabbard", "Runehollow Idol", "The Split Aspect", "The Wyrmling's Second Heart", "Oathstone of the Nameless King", "Hands of the Gemwright", "The Roadless Stride", "Sentence of the Ninth Bell", "The Eighth Blade Ornament", "The Hollow Throne", "Ninth Hammer Shard", "The Avalanche Edict", "The Twinfletch Idol", "Aegis of the Unbowed Saint", "Gloomsilver Reliquary", "Core-Splinter Idol", "Slimeheart Idol", "Scab of the Wound", "The Last Square"]);
/* gear affixes: id|P or S|group|BaseTags|ExcludeTags|weight|tiers|top ilvl|lowest ilvl */
const AFF_SRC=`life_large|P|Life|Chest;Belt||120|8|84|1|84;70;56;44;32;20;10;1
life|P|Life|Helm;Gloves;Boots;Ring;Amulet;Quiver;Shield;Tome||110|7|70|1|70;56;44;32;20;10;1
mana|P|Mana|Ring;Amulet;Helm;Gloves;Caster;RuneDagger;Chest;Boots||80|7|70|1|70;56;44;32;20;10;1
es_global|P|EnergyShieldGlobal|Ring;Amulet;Belt;Chest;Boots;Gloves||60|7|70|1|70;56;44;32;20;10;1
armour_local|P|DefenceFlat|Armour|Helm;Gloves;Boots;Shield;Tome|100|8|84|1|84;70;56;44;32;20;10;1
armour_local_small|P|DefenceFlat|Armour;Shield|Chest|100|8|84|1|84;70;56;44;32;20;10;1
evasion_local|P|DefenceFlatEvasion|Evasion|Helm;Gloves;Boots;Shield;Tome|100|8|84|1|84;70;56;44;32;20;10;1
evasion_local_small|P|DefenceFlatEvasion|Evasion;Shield|Chest|100|8|84|1|84;70;56;44;32;20;10;1
es_local|P|DefenceFlatEnergyShield|EnergyShield|Helm;Gloves;Boots;Shield;Tome|100|8|84|1|84;70;56;44;32;20;10;1
es_local_small|P|DefenceFlatEnergyShield|EnergyShield;Shield|Chest|100|8|84|1|84;70;56;44;32;20;10;1
defence_inc|P|DefenceInc|Defences;Shield||100|8|84|1|84;70;56;44;32;20;10;1
phys_inc_local|P|PhysInc|Melee;Bow||100|8|84|1|84;70;56;44;32;20;10;1
phys_added_local|P|PhysAdded|Melee;Bow||90|8|84|1|84;70;56;44;32;20;10;1
fire_added_local|P|FireAdded|Melee;Bow||70|8|84|1|84;70;56;44;32;20;10;1
fire_spell_added|P|FireSpellAdded|Caster;RuneDagger|Staff|60|8|84|1|84;70;56;44;32;20;10;1
fire_dmg_inc|P|FireInc|Caster;Amulet;RuneDagger|Staff|70|8|84|1|84;70;56;44;32;20;10;1
fire_spell_added_2h|P|FireSpellAdded|Staff||60|8|84|1|84;70;56;44;32;20;10;1
fire_dmg_inc_2h|P|FireInc|Staff||70|8|84|1|84;70;56;44;32;20;10;1
cold_added_local|P|ColdAdded|Melee;Bow||70|8|84|1|84;70;56;44;32;20;10;1
cold_spell_added|P|ColdSpellAdded|Caster;RuneDagger|Staff|60|8|84|1|84;70;56;44;32;20;10;1
cold_dmg_inc|P|ColdInc|Caster;Amulet;RuneDagger|Staff|70|8|84|1|84;70;56;44;32;20;10;1
cold_spell_added_2h|P|ColdSpellAdded|Staff||60|8|84|1|84;70;56;44;32;20;10;1
cold_dmg_inc_2h|P|ColdInc|Staff||70|8|84|1|84;70;56;44;32;20;10;1
lightning_added_local|P|LightningAdded|Melee;Bow||70|8|84|1|84;70;56;44;32;20;10;1
lightning_spell_added|P|LightningSpellAdded|Caster;RuneDagger|Staff|60|8|84|1|84;70;56;44;32;20;10;1
lightning_dmg_inc|P|LightningInc|Caster;Amulet;RuneDagger|Staff|70|8|84|1|84;70;56;44;32;20;10;1
lightning_spell_added_2h|P|LightningSpellAdded|Staff||60|8|84|1|84;70;56;44;32;20;10;1
lightning_dmg_inc_2h|P|LightningInc|Staff||70|8|84|1|84;70;56;44;32;20;10;1
poison_spell_added|P|PoisonSpellAdded|Caster;RuneDagger|Staff|60|8|84|1|84;70;56;44;32;20;10;1
poison_dmg_inc|P|PoisonInc|Caster;RuneDagger|Staff;Tome|70|8|84|1|84;70;56;44;32;20;10;1
poison_spell_added_2h|P|PoisonSpellAdded|Staff||60|8|84|1|84;70;56;44;32;20;10;1
poison_dmg_inc_2h|P|PoisonInc|Staff||70|8|84|1|84;70;56;44;32;20;10;1
spell_inc|P|SpellInc|Caster;RuneDagger|Staff|100|8|84|1|84;70;56;44;32;20;10;1
spell_inc_2h|P|SpellInc|Staff||100|8|84|1|84;70;56;44;32;20;10;1
skill_level|P|SkillLevel|Amulet;Caster;Melee;Helm;RuneDagger|Staff|18|2|68|46|68;46
skill_level_bow|P|SkillLevel|Bow||18|2|75|46|75;46
skill_level_2h|P|SkillLevel|Staff||18|3|80|46|80;60;46
attack_added_phys|P|AttackAdded|Ring;Amulet;Gloves;Quiver;Chest||50|7|70|1|70;56;44;32;20;10;1
attack_added_fire|P|AttackFire|Gloves;Quiver;Ring;Amulet;Boots||40|7|70|1|70;56;44;32;20;10;1
attack_added_cold|P|AttackCold|Gloves;Quiver;Ring;Amulet;Boots||40|7|70|1|70;56;44;32;20;10;1
vow_effect98|S|VowEffect98|Amulet||30|4|70|20|70;52;36;20
attack_added_lightning|P|AttackLightning|Gloves;Quiver;Ring;Amulet;Boots||40|7|70|1|70;56;44;32;20;10;1
fire_res|S|FireRes|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Quiver;Shield||110|8|84|1|84;70;56;44;32;20;10;1
cold_res|S|ColdRes|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Quiver;Shield||110|8|84|1|84;70;56;44;32;20;10;1
lightning_res|S|LightningRes|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Quiver;Shield||110|8|84|1|84;70;56;44;32;20;10;1
poison_res|S|PoisonRes|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Quiver;Shield||110|8|84|1|84;70;56;44;32;20;10;1
all_res|S|AllRes|Ring;Amulet||40|6|70|10|70;56;44;32;20;10
phys_as_elem|S|PhysAsElem|Chest;Shield;Helm||35|4|84|44|84;70;56;44
str_flat|S|Str|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Weapon;Shield||90|8|84|1|84;70;56;44;32;20;10;1
dex_flat|S|Dex|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Weapon;Quiver;Shield||90|8|84|1|84;70;56;44;32;20;10;1
int_flat|S|Int|Helm;Chest;Gloves;Boots;Belt;Ring;Amulet;Weapon;Shield||90|8|84|1|84;70;56;44;32;20;10;1
all_attr|S|Attributes|Amulet||50|7|70|1|70;56;44;32;20;10;1
attack_speed_local|S|AttackSpeed|Melee;Wand;Staff;Bow||90|8|84|1|84;70;56;44;32;20;10;1
attack_speed|S|AttackSpeed|Gloves;Quiver||50|4|56|20|56;44;32;20
cast_speed|S|CastSpeed|Caster;RuneDagger|Staff|90|8|84|1|84;70;56;44;32;20;10;1
cast_speed_2h|S|CastSpeed|Staff||90|8|84|1|84;70;56;44;32;20;10;1
cast_speed_jewel|S|CastSpeed|Amulet||50|4|56|20|56;44;32;20
cooldown_recovery|S|CooldownRecovery|Amulet;Weapon||40|3|70|44|70;56;44
crit_local|S|Crit|Weapon||70|6|84|20|84;70;56;44;32;20
crit_global|S|Crit|Amulet;Quiver||50|6|84|20|84;70;56;44;32;20
crit_multi|S|CritMulti|Weapon;Amulet||60|6|84|20|84;70;56;44;32;20
move_speed|S|MoveSpeed|Boots||80|6|56|1|56;44;32;20;10;1
life_regen|S|LifeRegen|Helm;Chest;Belt;Ring;Amulet;Boots;Gloves;Shield||60|8|84|1|84;70;56;44;32;20;10;1
mana_regen|S|ManaRegen|Ring;Amulet;Caster;Helm;RuneDagger||70|7|70|1|70;56;44;32;20;10;1
life_on_kill|S|LifeOnKill|Weapon;Gloves||50|6|56|1|56;44;32;20;10;1
ring_life_on_kill|P|LifeOnKill|Ring||50|6|56|1|56;44;32;20;10;1
mana_on_kill|S|ManaOnKill|Weapon||40|6|56|1|56;44;32;20;10;1
ring_mana_on_kill|P|ManaOnKill|Ring||40|6|56|1|56;44;32;20;10;1
mana_leech|S|ManaLeech|Gloves;Amulet||30|3|44|20|44;32;20
ring_mana_leech|P|ManaLeech|Ring||30|3|44|20|44;32;20
es_leech|S|EnergyShieldLeech|Gloves;Amulet;EnergyShield|Chest;Boots;Shield|30|4|56|20|56;44;32;20
ring_es_leech|P|EnergyShieldLeech|Ring|Chest;Boots;Shield|30|4|56|20|56;44;32;20
life_leech|S|LifeLeech|Weapon;Gloves||35|4|44|10|44;32;20;10
ring_life_leech|P|LifeLeech|Ring||35|4|44|10|44;32;20;10
area|S|Area|Amulet;Helm||40|5|84|32|84;70;56;44;32
ignite_chance|S|IgniteChance|Weapon;Gloves;Quiver;Tome||40|4|56|20|56;44;32;20
shock_chance|S|ShockChance|Weapon;Gloves;Quiver;Tome||40|4|56|20|56;44;32;20
ignite_effect|P|IgniteDamage|Weapon;Amulet;Belt||40|4|56|20|56;44;32;20
poison_effect|P|PoisonDamage|Weapon;Amulet;Belt||40|4|56|20|56;44;32;20
shock_effect|P|ShockEffect|Weapon;Amulet;Belt||40|4|56|20|56;44;32;20
freeze_duration|S|FreezeDuration|Weapon;Ring||40|4|56|20|56;44;32;20
bleed_chance|S|BleedChance|Weapon;Gloves;Quiver||40|4|56|20|56;44;32;20
bleed_effect|P|BleedDamage|Weapon;Amulet;Belt;Quiver||40|4|56|20|56;44;32;20
dot_multi|P|DotMulti|Weapon;Amulet;Quiver;Tome||30|4|70|32|70;56;44;32
chill_effect|S|ChillEffect|Weapon;Ring;Quiver;Tome||40|4|56|20|56;44;32;20
minion_dmg|P|MinionDamage|Wand;Tome||50|8|84|1|84;70;56;44;32;20;10;1
minion_dmg_2h|P|MinionDamage|Staff;Scythe||50|8|84|1|84;70;56;44;32;20;10;1
minion_dmg_jewel|P|MinionDamage|Amulet;Helm||40|7|84|10|84;70;56;44;32;20;10
minion_life|S|MinionLife|Helm;Chest;Belt;Shield;Tome||50|7|70|1|70;56;44;32;20;10;1
minion_speed|S|MinionSpeed|Gloves;Amulet;Boots||40|4|56|20|56;44;32;20
minion_crit|S|MinionCrit|Wand;Tome;Staff;Scythe;Amulet||40|6|84|20|84;70;56;44;32;20
minion_crit_multi|S|MinionCritMulti|Wand;Tome;Amulet||30|5|70|20|70;56;44;32;20
curse_effect|S|CurseEffect|Amulet;Helm;Wand;Tome||30|4|56|20|56;44;32;20
curse_limit|P|CurseLimit|Amulet||8|1|44|44|44
max_fire_res91|S|MaxFireRes91|Shield;Chest||12|2|84|70|84;70
max_cold_res91|S|MaxColdRes91|Shield;Chest||12|2|84|70|84;70
max_lightning_res91|S|MaxLightningRes91|Shield;Chest||12|2|84|70|84;70
max_poison_res91|S|MaxPoisonRes91|Shield;Chest||12|2|84|70|84;70
req_reduce|S|ReqReduce93|Weapon;Chest;Helm;Gloves;Boots;Shield;Tome||30|6|70|10|70;56;44;32;20;10
ring_move_speed|S|RingMove|Ring||40|3|84|56|84;70;56
gloves_cast_speed|S|CastSpeedGloves|Gloves||50|4|56|20|56;44;32;20
ring_attack_speed|S|AttackSpeedRing|Ring||40|3|70|44|70;56;44
ring_cast_speed|S|CastSpeedRing|Ring||40|3|70|44|70;56;44
poison_pen85_2h|S|PoisonPen85|TwoHand||35|4|84|44|84;70;56;44
poison_pen85_1h|S|PoisonPen85|OneHand||35|4|84|44|84;70;56;44
fire_pen95_2h|S|FirePen95|TwoHand||35|4|84|44|84;70;56;44
fire_pen95_1h|S|FirePen95|OneHand||35|4|84|44|84;70;56;44
cold_pen95_2h|S|ColdPen95|TwoHand||35|4|84|44|84;70;56;44
cold_pen95_1h|S|ColdPen95|OneHand||35|4|84|44|84;70;56;44
lightning_pen95_2h|S|LightningPen95|TwoHand||35|4|84|44|84;70;56;44
lightning_pen95_1h|S|LightningPen95|OneHand||35|4|84|44|84;70;56;44
elemental_pen95_amulet|S|ElementalPen95|Amulet||30|4|84|44|84;70;56;44
entropy_multi_wpn|P|EntropyMulti|Weapon;Tome;Quiver||40|4|84|32|84;60;44;32
entropy_multi_jwl|S|EntropyMulti|Amulet;Ring||30|3|84|44|84;60;44`;
const AFF=AFF_SRC.split("\n").map(l=>{const p=l.split("|");return{id:p[0],type:p[1],group:p[2],tags:p[3].split(";"),ex:p[4]?p[4].split(";"):[],w:+p[5],n:+p[6],hi:+p[7],lo:+p[8],lv:p[9]?p[9].split(";").map(Number):null};});
/* idol affixes: group|P or S|sizes (s,m,l,x = Idol1-4)|tiers; "x" suffixes also fit grand idols */
const IDOL_G="IdolLife|P|smlx|4;IdolMana|P|smlx|4;IdolEs|P|smlx|4;IdolArmour|P|smlx|4;IdolEvasion|P|smlx|4;IdolPhys|P|smlx|4;IdolElemental|P|smlx|4;IdolSpell|P|smlx|4;IdolMelee|P|smlx|4;IdolMinion|P|smlx|4;IdolFireRes|S|smlx|4;IdolColdRes|S|smlx|4;IdolLightningRes|S|smlx|4;IdolPoisonRes|S|smlx|4;IdolMove|S|smlx|3;IdolRegen|S|smlx|3;IdolAttackSpeed|S|smlx|3;IdolCastSpeed|S|smlx|3;IdolCrit|S|smlx|4;IdolCritMulti|S|smlx|4;IdolLifeKill|S|smlx|3;IdolManaRegen|S|smlx|4;IdolArea|S|smlx|3;IdolStr|S|smlx|4;IdolDex|S|smlx|4;IdolInt|S|smlx|4;IdolTotemSpeed|P|mlx|4;IdolTotemLife|S|mlx|4;IdolMinionLife|S|mlx|4;IdolMinionSpeed|S|mlx|4;IdolChannelArea|P|mlx|4;IdolChannelCost|S|mlx|4;IdolSlam|P|mlx|4;IdolSlamArea|S|mlx|4;IdolChain|P|mlx|4;IdolOrbit|P|mlx|4;IdolBowArea|S|mlx|4;IdolProjectile|P|mlx|4;IdolHoly|P|mlx|4;IdolPoison|P|mlx|4;IdolFire|P|mlx|4;IdolCold|P|mlx|4;IdolLightning|P|mlx|4;IdolMovement|P|mlx|4;IdolTrap|P|mlx|4;IdolShield|P|mlx|4;IdolBleed|P|mlx|4;IdolManaLeech|S|lx|4;IdolEntropyMulti|S|sm|3;IdolEntropySooner|S|l|2;IdolChaospen|S|x|1";
const IDOL_LV={"IdolEntropyMulti_s":"84;70;56","IdolEntropyMulti_m":"84;70;56","IdolEntropySooner_l":"84;70","IdolChaospen_x":"84","IdolLife_s":"84;70;56;20","IdolLife_m":"84;70;56;20","IdolLife_l":"84;70;56;20","IdolLife_x":"84;70;56;20","IdolMana_s":"84;70;56;20","IdolMana_m":"84;70;56;20","IdolMana_l":"84;70;56;20","IdolMana_x":"84;70;56;20","IdolEs_s":"84;70;56;20","IdolEs_m":"84;70;56;20","IdolEs_l":"84;70;56;20","IdolEs_x":"84;70;56;20","IdolArmour_s":"84;70;56;20","IdolArmour_m":"84;70;56;20","IdolArmour_l":"84;70;56;20","IdolArmour_x":"84;70;56;20","IdolEvasion_s":"84;70;56;20","IdolEvasion_m":"84;70;56;20","IdolEvasion_l":"84;70;56;20","IdolEvasion_x":"84;70;56;20","IdolPhys_s":"84;70;56;20","IdolPhys_m":"84;70;56;20","IdolPhys_l":"84;70;56;20","IdolPhys_x":"84;70;56;20","IdolElemental_s":"84;70;56;20","IdolElemental_m":"84;70;56;20","IdolElemental_l":"84;70;56;20","IdolElemental_x":"84;70;56;20","IdolSpell_s":"84;70;56;20","IdolSpell_m":"84;70;56;20","IdolSpell_l":"84;70;56;20","IdolSpell_x":"84;70;56;20","IdolMelee_s":"84;70;56;20","IdolMelee_m":"84;70;56;20","IdolMelee_l":"84;70;56;20","IdolMelee_x":"84;70;56;20","IdolMinion_s":"84;70;56;20","IdolMinion_m":"84;70;56;20","IdolMinion_l":"84;70;56;20","IdolMinion_x":"84;70;56;20","IdolFireRes_s":"84;70;56;20","IdolFireRes_m":"84;70;56;20","IdolFireRes_l":"84;70;56;20","IdolFireRes_x":"84;70;56;20","IdolColdRes_s":"84;70;56;20","IdolColdRes_m":"84;70;56;20","IdolColdRes_l":"84;70;56;20","IdolColdRes_x":"84;70;56;20","IdolLightningRes_s":"84;70;56;20","IdolLightningRes_m":"84;70;56;20","IdolLightningRes_l":"84;70;56;20","IdolLightningRes_x":"84;70;56;20","IdolPoisonRes_s":"84;70;56;20","IdolPoisonRes_m":"84;70;56;20","IdolPoisonRes_l":"84;70;56;20","IdolPoisonRes_x":"84;70;56;20","IdolMove_s":"84;70;56","IdolMove_m":"84;70;56;20","IdolMove_l":"84;70;56;20","IdolMove_x":"84;70;56;20","IdolRegen_s":"84;70;56","IdolRegen_m":"84;70;56;20","IdolRegen_l":"84;70;56;20","IdolRegen_x":"84;70;56;20","IdolAttackSpeed_s":"84;70;56","IdolAttackSpeed_m":"84;70;56;20","IdolAttackSpeed_l":"84;70;56;20","IdolAttackSpeed_x":"84;70;56;20","IdolCastSpeed_s":"84;70;56","IdolCastSpeed_m":"84;70;56;20","IdolCastSpeed_l":"84;70;56;20","IdolCastSpeed_x":"84;70;56;20","IdolCrit_s":"84;70;56;20","IdolCrit_m":"84;70;56;20","IdolCrit_l":"84;70;56;20","IdolCrit_x":"84;70;56;20","IdolCritMulti_s":"84;70;56;20","IdolCritMulti_m":"84;70;56;20","IdolCritMulti_l":"84;70;56;20","IdolCritMulti_x":"84;70;56;20","IdolLifeKill_s":"84;70;56","IdolLifeKill_m":"84;70;56;20","IdolLifeKill_l":"84;70;56;20","IdolLifeKill_x":"84;70;56;20","IdolManaRegen_s":"84;70;56;20","IdolManaRegen_m":"84;70;56;20","IdolManaRegen_l":"84;70;56;20","IdolManaRegen_x":"84;70;56;20","IdolArea_s":"84;70;56","IdolArea_m":"84;70;56;20","IdolArea_l":"84;70;56;20","IdolArea_x":"84;70;56;20","IdolStr_s":"84;70;56;20","IdolStr_m":"84;70;56;20","IdolStr_l":"84;70;56;20","IdolStr_x":"84;70;56;20","IdolDex_s":"84;70;56;20","IdolDex_m":"84;70;56;20","IdolDex_l":"84;70;56;20","IdolDex_x":"84;70;56;20","IdolInt_s":"84;70;56;20","IdolInt_m":"84;70;56;20","IdolInt_l":"84;70;56;20","IdolInt_x":"84;70;56;20","IdolTotemSpeed_m":"84;70;56;20","IdolTotemSpeed_l":"84;70;56;20","IdolTotemSpeed_x":"84;70;56;20","IdolTotemLife_m":"84;70;56;20","IdolTotemLife_l":"84;70;56;20","IdolTotemLife_x":"84;70;56;20","IdolMinionLife_m":"84;70;56;20","IdolMinionLife_l":"84;70;56;20","IdolMinionLife_x":"84;70;56;20","IdolMinionSpeed_m":"84;70;56;20","IdolMinionSpeed_l":"84;70;56;20","IdolMinionSpeed_x":"84;70;56;20","IdolChannelArea_m":"84;70;56;20","IdolChannelArea_l":"84;70;56;20","IdolChannelArea_x":"84;70;56;20","IdolChannelCost_m":"84;70;56;20","IdolChannelCost_l":"84;70;56;20","IdolChannelCost_x":"84;70;56;20","IdolSlam_m":"84;70;56;20","IdolSlam_l":"84;70;56;20","IdolSlam_x":"84;70;56;20","IdolSlamArea_m":"84;70;56;20","IdolSlamArea_l":"84;70;56;20","IdolSlamArea_x":"84;70;56;20","IdolChain_m":"84;70;56;20","IdolChain_l":"84;70;56;20","IdolChain_x":"84;70;56;20","IdolOrbit_m":"84;70;56;20","IdolOrbit_l":"84;70;56;20","IdolOrbit_x":"84;70;56;20","IdolBowArea_m":"84;70;56;20","IdolBowArea_l":"84;70;56;20","IdolBowArea_x":"84;70;56;20","IdolProjectile_m":"84;70;56;20","IdolProjectile_l":"84;70;56;20","IdolProjectile_x":"84;70;56;20","IdolHoly_m":"84;70;56;20","IdolHoly_l":"84;70;56;20","IdolHoly_x":"84;70;56;20","IdolPoison_m":"84;70;56;20","IdolPoison_l":"84;70;56;20","IdolPoison_x":"84;70;56;20","IdolFire_m":"84;70;56;20","IdolFire_l":"84;70;56;20","IdolFire_x":"84;70;56;20","IdolCold_m":"84;70;56;20","IdolCold_l":"84;70;56;20","IdolCold_x":"84;70;56;20","IdolLightning_m":"84;70;56;20","IdolLightning_l":"84;70;56;20","IdolLightning_x":"84;70;56;20","IdolMovement_m":"84;70;56;20","IdolMovement_l":"84;70;56;20","IdolMovement_x":"84;70;56;20","IdolTrap_m":"84;70;56;20","IdolTrap_l":"84;70;56;20","IdolTrap_x":"84;70;56;20","IdolShield_m":"84;70;56;20","IdolShield_l":"84;70;56;20","IdolShield_x":"84;70;56;20","IdolBleed_m":"84;70;56;20","IdolBleed_l":"84;70;56;20","IdolBleed_x":"84;70;56;20","IdolManaLeech_l":"84;70;56;20","IdolManaLeech_x":"84;70;56;20"}; /* real tier item levels of idol affixes (game files) */
IDOL_G.split(";").forEach(g=>{const p=g.split("|"),n=+p[3];p[2].split("").forEach(sz=>{
  const tag="Idol"+({s:1,m:2,l:3,x:4})[sz];const tiers=(sz==="s"&&n===3)?3:n;
  const tg=[tag];if(sz==="x"&&p[1]==="S"&&!/Total|TotemLife|ManaLeech|Minion(Life|Speed)|Channel|Slam|Bow/.test(p[0]))tg.push("IdolGrand");
  const lvs=IDOL_LV[p[0]+"_"+sz],lv=lvs?lvs.split(";").map(Number):null;
  AFF.push({id:p[0]+"_"+sz,type:p[1],group:p[0],tags:tg,ex:[],w:100,n:lv?lv.length:tiers,hi:lv?lv[0]:84,lo:lv?lv[lv.length-1]:(tiers===3?56:20),lv});});});
/* fixed grand idol prefixes (group IdolGrand): name|weight|tiers|top ilvl|lowest ilvl */
"chain_plus|4|1|84|84;ballista_plus|1|1|84|84;orbit_plus|4|1|84|84;skeleton_plus|4|1|84|84;slam_spike|4|1|84|84;bow_projectile|4|1|84|84;channel_ramp|60|2|70|56;phys_as_fire|60|2|70|56;phys_as_cold|60|2|70|56;phys_as_lightning|60|2|70|56;elemental_pen|60|2|70|56;life_inc|70|2|70|56;max_res|40|1|56|56;max_poison_res|40|1|56|56;melee_afterimage|4|1|84|84;skeleton_wizard_plus|4|1|84|84;eng_totem|30|2|84|70;eng_afterimage|30|2|84|70;eng_orbit|30|2|84|70;eng_trap|30|2|84|70;eng_minion|30|2|84|70;eng_brand|30|2|84|70;eng_slam|30|2|84|70;trap_plus|4|1|84|84;spark_plus|4|1|84|84".split(";").forEach(s=>{const p=s.split("|");AFF.push({id:"idol_grand_"+p[0],type:"P",group:"IdolGrand",tags:["IdolGrand"],ex:[],w:+p[1],n:+p[2],hi:+p[3],lo:+p[4],lv:+p[2]===1?[+p[3]]:[+p[3],+p[4]]});});
/* The affix table names Idol size tiers IdolFireRes_s; the game and the line list name the same affix idol_fire_res_s. A few differ in the middle (IdolTotemSpeed_m = idol_ballista_speed_m, IdolFire_m = idol_fire_damage_m). Returns the line id (or the input when it is not an Idol size tier). */
const idolLineId=id=>{if(!/^Idol[A-Z]/.test(id))return id;const k=id.replace(/([a-z0-9])([A-Z])/g,"$1_$2").toLowerCase();return[k,k.replace(/^idol_totem_/,"idol_ballista_"),k.replace(/^idol_(\w+?)_([smlx])$/,"idol_$1_damage_$2")].find(c=>c in LINEN)||id;};
/* uniques with a drop weight above 0: name|base id|level|weight|flag (C chase, P primal, S signature)|first three stat keys */
const UNIQUE_SRC=`Windwhisper|fletchers_quiver|12|80||Projectiles.Flat, CritChance.Inc, MoveSpeed.Inc
Stormweaver's Coil|topaz_ring|16|80||Chains.Flat, Damage.Inc, Keystone.Flag
Ashen Crown|silk_helm_2|18|70||Projectiles.Flat, CastSpeed.Inc, Damage.Inc
Mountainheart|plate_chest_3|30|60||Keystone.Flag, Defences.Inc, Life.Flat
Hearthfire|staff_2|10|100||AddedDamage.Flat, Damage.Inc, CastSpeed.Inc
Glacierheart|sapphire_ring|20|80||Area.Inc, Damage.More, Mana.Flat
Thornhide Wraps|leather_gloves_2|12|100||AddedDamage.Flat, LifeLeech.Flat, AttackSpeed.Inc
Pilgrim's Stride|leather_boots_1|4|120||MoveSpeed.Inc, Life.Flat, Resist.Flat
Vowkeeper Band|iron_ring|3|110||Life.Flat, Attributes.Flat, Resist.Flat
Eye of the Tempest|lapis_amulet|36|40||SkillLevel.Flat, Penetration.Flat, CastSpeed.Inc
Mouth of the Mire|jade_amulet|52|40||SkillLevel.Flat, Penetration.Flat, PoisonDamage.Inc
The Glass Soul|silk_chest_3|32|50||Damage.More, Life.More, EnergyShield.Flat
Warlord's Girdle|heavy_belt|16|90||Life.Inc, Damage.Inc, Armour.Inc
Chainbreaker|chain_helm_2|22|0||Chains.Flat, Damage.Inc, Defences.Inc
Emberheart|brigandine_chest_2|14|80||Damage.Inc, Resist.Flat, Life.Flat
Squire's Promise|greatsword_1|3|100||Damage.Inc, AddedDamage.Flat, AttackSpeed.Inc
Crook of the Vale|staff_1|3|100||AddedDamage.Flat, Damage.Inc, CastSpeed.Inc
Wintercall Orb|moonstone_amulet|16|70||OrbCount.Flat, Damage.Inc, Int.Flat
Soulreaper|scythe_3|16|70||Damage.Inc, Area.Inc, LifeOnKill.Flat
Aegis of the Oath|plate_chest_3|30|70||Block.Flat, Life.Inc, Armour.Inc
The Pilgrim's Pyre|plate_chest_4|44|40||Keystone.Flag, Life.Inc, Armour.Inc
Engineer's Lodestone|chain_belt|24|2||TotemCount.Flat, TotemSpeed.Inc, TotemLife.Inc
Twin Fangs of the Ronin|sword1h_3|16|70||Damage.Inc, CritChance.Inc, Cooldown.Inc
Shadowsilk Wraps|leather_gloves_2|20|70||OrbitMax.Flat, OrbitMovingDamage.Flat, Evasion.Inc
Cyclone's Eye|greatsword_9|18|70||Damage.Inc, Area.Inc, ChannelCostLess.Flat
The Deephall Bulwark|shield_7|30|70||Block.Flat, Defences.Inc, Life.Flat
Brokkr's Fang|dagger_4|26|60||Damage.Inc, AttackSpeed.Inc, CritChance.Inc
Sindri's Edge|sword1h_4|26|60||Damage.Inc, Block.Flat, LifeOnKill.Flat
Stonefist Wraps|leather_gloves_9|18|70||AddedDamage.Flat, AttackSpeed.Inc, Dex.Flat
Stormfrost Band|garnet_ring|8|100||Convert.Flat, Chains.Flat, Penetration.Flat
Frostfeather Quiver|hunters_quiver|6|110||DamageAsExtra.Flat, Area.Inc, MoveSpeed.Inc
Ironroot Signet|copper_band|9|100||TotemCount.Flat, TotemLife.Inc, TotemSpeed.Inc
Thousand-Petal Blade|sword1h_2|10|100||AttackSpeed.Inc, CritChance.Inc, AddedDamage.Flat
Webspinner Gloves|leather_gloves_2|12|100||Chains.Flat, Damage.Inc, Trigger.Trigger
Aftershock Greaves|plate_boots_2|14|90||MoveSpeed.Inc, Defences.Inc, Trigger.Trigger
Wand of the Ash March|wand_2|14|90||MinionDamage.Inc, Convert.Flat, MinionSpeed.Inc
Shatterglass Pendant|moonstone_amulet|16|90||DeathBurst.Flat, Damage.Inc, Resist.Flat
Siphoning Lattice|ritual_gloves_9|18|90||ChannelRamp.Flat, LifeLeech.Flat, ManaLeech.Flat
Thrice-Sworn Sash|chain_belt|20|90||Reservation.Inc, Mana.Flat, Life.Flat
Galeheart Greataxe|greataxe_3|24|0||Damage.Inc, DamageAsExtra.Flat, Area.Inc
Lightsworn Reliquary|tome_3|30|4||MinionCap.Flat, MinionLife.Inc, MinionDamage.Inc
Thunderwake Maul|mace1h_2|10|40||OrbitCount.Flat, OrbitMovingDamage.Flat, DamageAsExtra.Flat
Overload Coil|amethyst_ring|32|35||Keystone.Flag, CritChance.Inc, CritMulti.Flat
Starcaller's Staff|staff_3|34|35||Damage.Inc, SkyfallRepeat.Flat, SkyfallDelay.Inc
The Oath Unbroken|sunstone_amulet|72|6|P|Reservation.More, Keystone.Flag, Attributes.Flat
Shroud of the Restless Gale|silk_chest_6|68|10|S|EnergyShield.Inc, Life.Flat, MinionLife.Inc
Emberstride Treads|leather_boots_6|68|10|S|MoveSpeed.Inc, Evasion.Flat, Resist.Flat
Diadem of the Storm Choir|silk_helm_6|68|4|S|MinionDamage.Inc, Mana.Flat, EnergyShield.Flat
Hollowhorn|bow_7|56|4|S|AddedDamage.Flat, AttackSpeed.Inc, MinionDamage.Inc
Frostbloom Signet|prismatic_ring|64|8|S|Damage.Inc, CritChance.Inc, Resist.Flat
Thundercoil Gauntlets|plate_gloves_6|68|0||AttackSpeed.Inc, AddedDamage.Flat, Armour.Flat
Oathfire Censer|sunstone_amulet|72|10|S|Damage.Inc, Life.Flat, Resist.Flat
Bulwark of the Last Gate|shield_13|70|0||Block.Flat, Life.Flat, Armour.Inc
Gravewalker's Girdle|vanguard_belt|66|4|S|Life.Flat, MinionLife.Inc, MinionSpeed.Inc
Tidebreaker Maul|greatmace_6|74|4|S|AddedDamage.Flat, Damage.Inc, DamageAsExtra.Flat
Wyrmblade of the Black Oath|greatsword_6|76|4|S|AddedDamage.Flat, CritChance.Inc, Damage.Inc
Ring of Echoing Oaths|rune_ring|70|4|S|GrantSupport.Flag, ManaCost.Inc, Damage.Inc
Gravecleaver|greataxe_7|72|4|S|AddedDamage.Flat, AttackSpeed.Inc, MinionLife.Inc
Dawnforge Maul|greatmace_6|72|10|S|AddedDamage.Flat, Damage.Inc, Life.Flat
Stormfang|sword1h_8|70|4|S|AddedDamage.Flat, CritChance.Inc, AttackSpeed.Inc
Vowfire Cuirass|plate_chest_6|70|4|S|Armour.Inc, Life.Flat, Resist.Flat
Rimeheart Wand|wand_5|54|10|S|Damage.Inc, Mana.Flat, Resist.Flat
Gravesong|scythe_5|54|10|S|Damage.Inc, MinionLife.Inc, Trigger.Trigger
Orrery of the Long Night|silk_helm_4|40|40||OrbCount.Flat, SkillDuration.Inc, Damage.More
The Thousand Sparks|silk_gloves_4|40|40||BrandCount.Flat, SkillDuration.More, Damage.More
The Unfallen Ancestor|agate_amulet|40|40||Keystone.Flag, TotemSpeed.Inc, Damage.Inc
Quiver of the Last Watch|sylvan_quiver|40|2||TotemCount.Flat, SkillDuration.Inc, TotemSpeed.Inc
Hexbinder's Censer|onyx_amulet|38|40||Keystone.Flag, CurseEffect.Inc, Mana.Inc
The Red Hunger|leather_gloves_9|34|40||BloodlustOnKill.Flat, BloodlustMax.Flat, AttackSpeed.Inc
Standard of the Last Legion|chain_belt|36|40||WarBanner.Flat, ValourMax.Flat, BannerEffect.Inc
The Hunter's Promise|leather_boots_1|38|40||MarkOnHit.Flat, MarkMax.Flat, MoveSpeed.Inc
The Ossuary Lantern|citrine_amulet|44|4||MinionCap.Flat, MinionDamage.Inc, Int.Flat
The Charnel Bell|bone_talisman|44|40||MinionCap.Flat, MinionDeathBurst.Flat, MinionLife.More
The Splitting Psalm|twostone_ring|48|60||Fork.Flat, Pierce.Flat, Damage.Inc
Plaguewright's Grasp|leather_gloves_4|50|30||Convert.Flat, PoisonDamage.Inc, Trigger.Trigger
Halo of the Restless Saint|brigandine_helm_4|52|60||OrbitCount.Flat, OrbitMax.Flat, Damage.More
The Last Volley|volley_quiver|60|12||GrantSupport.Flag, Area.Inc, Damage.Inc
Rimecrown|staff_6|68|6||SkillLevel.Flat, Damage.Inc, FreezeDuration.Inc
The Blackbile Censer|turquoise_amulet|54|0||PoisonChance.Flat, PoisonDamage.Inc, AilmentDuration.Inc
The Headsman's Grip|ritual_gloves_6|68|6||CritMulti.Flat, CritChance.Inc, AttackSpeed.Inc
The Wolf's Due|vanguard_belt|56|12||BloodlustOnBossCrit.Flat, BloodlustMax.Flat, CritChance.Inc
Kingbreaker|greatmace_7|78|6||Damage.Inc, AddedDamage.Flat, SkillLevel.Flat
The Snarewright's Belt|bloodbound_girdle|50|15||GrantSupport.Flag, SkillDuration.Inc, Damage.Inc
The Gate That Answers|shield_13|70|12||Block.Flat, Damage.Inc, Trigger.Trigger
The Reckoner's Wraps|plate_gloves_5|58|6||FuryOnKill59.Flat, FurySpender59.Flat, AttackSpeed.Inc
Reliquary of the Second Dawn|sunstone_amulet|76|4|S|Trigger.Trigger, Repeats.Flat, Damage.Inc
The Eleventh Cut|leather_gloves_6|76|10|S|Trigger.Trigger, AttackSpeed.Inc, CritChance.Inc
Girdle of the Turning Earth|vanguard_belt|76|4|S|Trigger.Trigger, Damage.Inc, Life.Flat
Heart of the White Silence|staff_15|76|4|S|OrbCount.Flat, Trigger.Trigger, SkillLevel.Flat
The Sexton's Last Candle|wand_7|76|4|S|Trigger.Trigger, SkillLevel.Flat, AddedDamage.Flat
Crown of the Seventh Verdict|plate_helm_6|76|4|S|Trigger.Trigger, SkillLevel.Flat, Damage.Inc
Quiver of the Ninth Storm|volley_quiver|76|4|S|Chains.Flat, SkillLevel.Flat, Trigger.Trigger
Breastplate of the Long Verdict|plate_chest_6|76|4|S|Trigger.Trigger, Life.Flat, Armour.Inc
The Siege-Wright's Vow|volley_quiver|76|4|S|TotemCount.Flat, Trigger.Trigger, TotemSpeed.Inc
The Ossuary Chorus|wand_6|76|4|S|MinionCap.Flat, Trigger.Trigger, SkillLevel.Flat
The Widow's Patience|ritual_gloves_6|76|12|S|TrapCount.Flat, TrapRearm.Inc, AttackSpeed.Inc
Cinderwick|wand_7|76|6|S|SkillLevel.Flat, BrandCount.Flat, Damage.Inc
Dawnwarden's Verdict|mace1h_6|74|12|S|SkillLevel.Flat, Damage.Inc, DamageAsExtra.Flat
Veinwrit Grips|leather_gloves_4|40|25|S|BleedStacks.Flat, BleedChance.Flat, AttackSpeed.Inc
The Red Harvest|brigandine_chest_3|30|25|S|BleedBurst.Flat, BleedChance.Flat, BleedDamage.Inc
The Dawnward Bulwark|shield_9|40|25|S|Trigger.Trigger, Damage.Inc, Block.Flat
Facebreaker|leather_gloves_4|40|25|S|Keystone.Flag, Damage.More, AttackSpeed.Inc
Dreadcrown|silk_helm_4|40|25|S|CurseLimit.Flat, CurseEffect.Inc, Reservation.Inc
The Unyielding Vow|plate_chest_6|68|25|S|ArmourMore.Flat, Defences.Inc, FortifyEffect.Inc
The Patient Bastion|shield_13|70|25|S|BlockMore.Flat, Block.Flat, Defences.Inc
The Heartwood Girdle|bloodbound_girdle|52|25|S|LifeMore.Flat, Life.Flat, Life.Inc
Crown of the Quiet Ward|silk_helm_6|68|25|S|EnergyShieldMore.Flat, Defences.Inc, EnergyShield.Flat
Windwrit Treads|leather_boots_6|68|25|S|EvasionMore.Flat, Defences.Inc, MoveSpeed.Inc
The Oathkeeper's Stand|plate_gloves_6|68|25|S|FortifyDamage.Flat, FortifyMax.Flat, Defences.Inc
Stormwake Treads|silk_boots_3|28|25|S|Trigger.Trigger, SkillDuration.Inc, MoveSpeed.Inc
The Third Thunder|moonsilver_ring|40|4|S|BrandCount.Flat, SkillDuration.Inc, CastSpeed.Inc
The Long Storm|lapis_amulet|36|25|S|SkillDuration.Inc, SparkRate.Inc, Damage.Inc
Veilmother's Vestment|silk_chest_6|68|20|S|Defences.Inc, EnergyShield.Flat, EsRecharge.Inc
Soulsip Wraps|silk_gloves_5|56|20|S|EnergyShieldLeech.Flat, Defences.Inc, EnergyShield.Flat
Weeping Talons|claw_7|76|20||Damage.Inc, BleedChance.Flat, BleedDamage.Inc
The Pale Rake|claw_6|62|0||Damage.Inc, CritChance.Inc, LifeLeech.Flat
The Quiet Verdict|dagger_7|70|20||Damage.Inc, CritChance.Inc, PoisonChance.Flat
Jarlsbane|axe1h_8|78|20||Damage.Inc, AttackSpeed.Inc, BleedChance.Flat
The Fissure Edge|axe1h_7|66|20||Damage.Inc, AttackSpeed.Inc, CritChance.Inc
Skyrend|bow_8|70|20||Damage.Inc, AddedDamage.Flat, CritMulti.Flat
Twinscar|sword1h_9|80|20||Damage.Inc, BleedChance.Flat, BleedDamage.Inc
The Last Petal|sword1h_8|68|20||Damage.Inc, CritChance.Inc, AttackSpeed.Inc
Hoarfall|greatsword_6|72|0||Damage.Inc, AttackSpeed.Inc, DamageAsExtra.Flat
Ravenmaw|greataxe_7|76|20||Damage.Inc, AttackSpeed.Inc, BleedChance.Flat
Nightglass|dagger_8|78|0||Damage.Inc, AttackSpeed.Inc, CritMulti.Flat
The Bellwarden|mace1h_8|80|0||Damage.Inc, AttackSpeed.Inc, Block.Flat
The Unwritten Oath|tome_5|72|20||CritChance.Inc, CritMulti.Flat, EnergyShield.Flat
Psalter of the Quiet Host|tome_5|66|0||SkillLevel.Flat, MinionDamage.Inc, MinionLife.Inc
The Oathsplit Fang|rune_dagger_3|78|0||Damage.Inc, AttackSpeed.Inc, CastSpeed.Inc
The Last Harvest|scythe_7|76|0||Damage.Inc, AttackSpeed.Inc, Area.Inc
Gravetithe|scythe_6|62|20||Damage.Inc, CritChance.Inc, PoisonChance.Flat
Thornwake|bow_8|70|20||Damage.Inc, BleedChance.Flat, BleedDamage.Inc
Oathbleeder|fist_6|78|20||Damage.Inc, AttackSpeed.Inc, BleedChance.Flat
Cinderknuckle|fist_5|68|20||Damage.Inc, AttackSpeed.Inc, DamageAsExtra.Flat
Rimewrit|rune_dagger_2|66|0||Damage.Inc, CastSpeed.Inc, CritMulti.Flat
Kingbreaker (Primal)|greatmace_7|78|1|P|Damage.Inc, AddedDamage.Flat, SkillLevel.Flat
Gravesong (Primal)|scythe_5|68|1|P|Damage.Inc, MinionLife.Inc, Trigger.Trigger
Gravecleaver (Primal)|greataxe_7|72|1|P|AddedDamage.Flat, AttackSpeed.Inc, MinionLife.Inc
Tidebreaker Maul (Primal)|greatmace_6|74|1|P|AddedDamage.Flat, Damage.Inc, DamageAsExtra.Flat
Stormfang (Primal)|sword1h_8|70|1|P|AddedDamage.Flat, CritChance.Inc, AttackSpeed.Inc
Rimecrown (Primal)|staff_6|68|1|P|SkillLevel.Flat, Damage.Inc, FreezeDuration.Inc
Cinderwick (Primal)|wand_7|76|1|P|SkillLevel.Flat, BrandCount.Flat, Damage.Inc`;
const UNIQUE_EXTRA=`The Falling Feather|moonsilver_ring|24|20||Trigger.Trigger, Damage.Inc, AttackSpeed.Inc, Dex.Flat|the_falling_feather
Tithe of the Red Furrow|ash_greataxe_7|72|25||BleedStacks.Flat, BleedChance.Flat, BleedDamage.Inc, AttackSpeed.Inc|u200_tithe_of_the_red_furrow
Rampart of Embers|shield_15|80|70||Convert.Flat, IgniteStacks.Flat, IgniteChance.Flat, Block.Flat, Armour.Flat|u200_rampart_of_embers
Thunder-Anvil Greaves|plate_boots_7|82|70||Convert.Flat, ShockStacks.Flat, ShockChance.Flat, MoveSpeed.Inc|u200_thunder_anvil_greaves
Rotfang Cleaver|ct_cleave_axe1h_8|78|70||PoisonChance.Flat, PoisonDamage.Inc, PoisonSpreadOnKill.Flat, Damage.Inc|u200_rotfang_cleaver
Tempest Hex Ring|topaz_ring|54|70||ShockSpreadOnKill.Flat, CurseEffect.Inc, ShockChance.Flat, Resist.Flat|u200_tempest_hex_ring
Crimson Petal Blades|sword1h_9|80|25||BleedStacks.Flat, BleedChance.Flat, BleedDamage.Inc, AttackSpeed.Inc|u200_crimson_petal_blades
Gale-Edge Wakizashi|ash_dagger_8|78|70||Fork.Flat, Damage.Inc, AttackSpeed.Inc, Dex.Flat|u200_gale_edge_wakizashi
The Woeweaver's Grasp|silk_gloves_7|84|5||CurseLimit.Flat, CurseEffect.Inc, Attributes.Flat, Resist.Flat|u200_the_woeweaver_s_grasp
The Mana-Ward Signet|topaz_ring|60|70||ManaBeforeLife.Flat, Mana.Flat, ManaRegen.Inc, Int.Flat|u200_the_mana_ward_signet
Frostgrave Maul|ash_greatmace_7|78|70||Convert.Flat, ChillEffect.Inc, ShatterOnKill.Flat, Damage.Inc|u200_frostgrave_maul
Judicator's Gavel|ash_mace1h_8|80|70||Trigger.Trigger, CritChance.Inc, CritMulti.Flat, CastSpeed.Inc|u200_judicator_s_gavel
The Radiant Wheel|ash_greatsword_7|82|70||Trigger.Trigger, CritChance.Inc, AttackSpeed.Inc, Damage.Inc|u200_the_radiant_wheel
Firebrand Codex|ct_lore_tome_5|66|70||Trigger.Trigger, IgniteStacks.Flat, Damage.Inc, CastSpeed.Inc|u200_firebrand_codex
Raijin's Fist|ct_knuckle_fist_6|74|70||ShockChance.Flat, Trigger.Trigger, Damage.Inc, AttackSpeed.Inc|u200_raijin_s_fist
Marrow Reliquary|ct_lore_tome_5|66|70||Trigger.Trigger, Pierce.Flat, Damage.Inc, Int.Flat|u200_marrow_reliquary
The Grey Covenant|diamond_ring|66|25||Convert.Flat, AilmentDuration.Inc, PoisonChance.Flat, Resist.Flat|u200_the_grey_covenant
Carrion Lantern|ct_lore_tome_5|66|70||Trigger.Trigger, PoisonDamage.Inc, CastSpeed.Inc, EnergyShield.Flat|u200_carrion_lantern
Seal of the Hammerbearer|idol_ancestor|80|5||Damage.Inc, OrbitRate.Inc, Int.Flat, Life.Inc|u200_seal_of_the_hammerbearer
Blink-Thread Sash|wardweave_sash|72|70||Trigger.Trigger, MoveSpeed.Inc, Cooldown.Inc, EnergyShield.Flat|u200_blink_thread_sash
Seal of the Iaido Master|idol_ancestor|80|5||Dragonling.Flag, Dragonling.Flag, Dex.Flat, CritChance.Inc|u200_seal_of_the_iaido_master
Crusader's Stride|plate_boots_7|82|70||Trigger.Trigger, MoveSpeed.Inc, Cooldown.Inc, Armour.Flat|u200_crusader_s_stride
The Thunder Psalm|plate_helm_7|82|70||Trigger.Trigger, ShockStacks.Flat, ShockChance.Flat, Life.Flat|u200_the_thunder_psalm
The Parrying Tsuba|ash_sword1h_9|80|70||Block.Flat, Trigger.Trigger, Evasion.Flat, Dex.Flat|u200_the_parrying_tsuba
Bloodmoon Quiver|ct_volley_volley_quiver|60|70||LifeLeech.Flat, LeechVsBleeding113.Flat, BleedChance.Flat, Dex.Flat|u200_bloodmoon_quiver
Bloodfletch Quiver|ct_volley_volley_quiver|62|70||BleedChance.Flat, PierceBleed113.Flat, BleedDamage.Inc, Dex.Flat|u200_bloodfletch_quiver
Cinderstep Slippers|silk_boots_7|82|70||Trigger.Trigger, IgniteStacks.Flat, IgniteDamage.Inc, MoveSpeed.Inc, EnergyShield.Flat|u200_cinderstep_slippers
Thunderstead Shield|ash_shield_15|80|70||Block.Flat, Trigger.Trigger, ShockEffect.Inc, Resist.Flat|u200_thunderstead_shield
The Thunderhead Signet|topaz_ring|56|70||DamageAsExtra.Flat, ShockChance.Flat, ShockSpreadOnKill.Flat, ShockEffect.Inc, Dex.Flat|u200_the_thunderhead_signet
The Oath of Iron and Glass|plate_chest_7|82|25||Keystone.Flag, MaxResist.Flat, Defences.Inc, Life.Flat|u200_the_oath_of_iron_and_glass
Gauntlets of the Dawn Forge|plate_gloves_7|82|70||Keystone.Flag, AddedDamage.Flat, Int.Flat, AttackSpeed.Inc|u200_gauntlets_of_the_dawn_forge
Shard of the Fourth Spark|idol_seam|84|0|C|BrandCount.Flat, SparkBurst.Flat, SparkRate.Inc, SkillDuration.Inc|u200_shard_of_the_fourth_spark
Mardoth's Last Pebble|idol_pebble|84|0|C|SkillLevel.Flat, Attributes.Flat, ItemRarity.Inc|u200_mardoths_last_pebble
Kagerou Sandals|leather_boots_7|82|70||Trigger.Trigger, MoveSpeed.Inc, Evasion.Flat|u200_kagerou_sandals
Aegis of the Unbowed Saint|shield_15|84|0|C|MaxBlock113.Flat, BlockRestorePct113.Flat, Block.Flat, Armour.Inc|u200_aegis_of_the_unbowed_saint
Choir of All Heralds|veilglass_amulet|70|25||HeraldEffectPerHerald113.Flat, Reservation.Inc, Attributes.Flat|u200_choir_of_all_heralds
Stormwhirl Mantle|silk_chest_7|82|25||ShockStacks.Flat, ShockDurVsUnique113.Flat, Damage.Inc, EnergyShield.Flat|u200_stormwhirl_mantle
The Heartwarden's Cinch|ironwarden_girdle|70|25||Life.More, Keystone.Flag, Life.Flat, Resist.Flat|u200_the_heartwarden_s_cinch
Ember-Tipped Quiver|ct_volley_volley_quiver|60|70||Convert.Flat, Trigger.Trigger, Damage.Inc, Dex.Flat|u200_ember_tipped_quiver
Windrunner's Mantle|leather_chest_7|82|70||Trigger.Trigger, Evasion.Inc, MoveSpeed.Inc, Life.Flat|u200_windrunner_s_mantle
Pyreheart Signet|cinderstone_ring|72|25||IgniteVsUnique113.Flat, IgniteChance.Flat, Resist.Flat|u200_pyreheart_signet
Mark of the Last Sentence|leather_helm_7|82|70||SureCritVsSentenced113.Flat, CritMulti.Flat, Dex.Flat, Life.Flat|u200_mark_of_the_last_sentence
Bone Choir Diadem|silk_helm_7|82|25||Fork.Flat, MinionDamage.Inc, EnergyShield.Flat|u200_bone_choir_diadem
The Sentinel's Oath|leather_helm_7|82|70||BallistaVsSentenced113.More, TotemSpeed.Inc, Life.Flat, Resist.Flat|u200_the_sentinel_s_oath
The Faltering Star|diamond_ring|62|70||SpellCritVsFaltering113.Flat, CritMulti.Flat, CurseEffect.Inc, Int.Flat|u200_the_faltering_star
Frostmoon Katana|ash_sword1h_9|80|70||Convert.Flat, Trigger.Trigger, FreezeDuration.Inc, CritChance.Inc|u200_frostmoon_katana
Gravedigger's Oath|ash_scythe_7|74|70||Trigger.Trigger, Damage.Inc, PoisonChance.Flat, MinionDamage.Inc|u200_gravedigger_s_oath
Frostbone Staff|staff_7|82|70||Trigger.Trigger, Damage.Inc, ChillEffect.Inc, CastSpeed.Inc|u200_frostbone_staff
Frostbitten Grips|leather_gloves_7|82|70||CritVsChilled113.More, ChillEffect.Inc, CritChance.Inc, Dex.Flat|u200_frostbitten_grips
The Ninth Cut|veilglass_amulet|68|70||BleedDotVsSentenced113.Flat, BleedChance.Flat, BleedDamage.Inc, Dex.Flat|u200_the_ninefold_wound
Glacial Quillstaff|staff_7|82|70||Trigger.Trigger, FreezeDuration.Inc, Damage.Inc, CastSpeed.Inc|u200_glacial_quillstaff
Starsplitter Wand|ash_wand_7|76|70||Trigger.Trigger, CritChance.Inc, CritMulti.Flat, CastSpeed.Inc, Trigger.Trigger|u200_starsplitter_wand
Signet of the Lost Order (Chain Reaction)|diamond_ring|68|1|P|Keystone.Flag, Life.Flat, Attributes.Flat|signet_of_the_lost_order_chain_reaction
Signet of the Lost Order (Iron Resolve)|diamond_ring|68|1|P|Keystone.Flag, Life.Flat, Attributes.Flat|signet_of_the_lost_order_iron_resolve
Signet of the Lost Order (Blood Magic)|diamond_ring|68|1|P|Keystone.Flag, Life.Flat, Attributes.Flat|signet_of_the_lost_order_blood_magic
Signet of the Lost Order (Elemental Overload)|diamond_ring|68|0|P|Keystone.Flag, Life.Flat, Attributes.Flat|signet_of_the_lost_order_elemental_overload
Signet of the Lost Order (Spellblade)|diamond_ring|68|1|P|Keystone.Flag, Life.Flat, Attributes.Flat|signet_of_the_lost_order_spellblade
Signet of the Lost Order (Hollow Covenant)|diamond_ring|68|1|P|Keystone.Flag, Life.Flat, Attributes.Flat|signet_of_the_lost_order_hollow_covenant
Oathbreaker|greatsword_3|40|0|C|Damage.Inc, SkillLevel.Flat, Area.Inc
The First Vow|greatsword_1|44|0|C|Damage.Inc, AddedDamage.Flat, AttackSpeed.Inc
Crown of the Bone King|silk_helm_9|40|0|C|MinionCap.Flat, Convert.Flat, MinionSpeed.Inc
Hand of Dawn|mace1h_3|40|0|C|Damage.Inc, OrbitCount.Flat, Damage.More
Stormstring|bow_6|45|0|C|Damage.Inc, Damage.Inc, Chains.Flat
The Blackbile Seal|prismatic_ring|76|0||Convert.Flat, PoisonChance.Flat, PoisonDamage.Inc
The Last Cut|idol_seam|76|0|S|Trigger.Trigger, Evasion.Inc, Life.Flat
Sleepy's Continental Strap|bloodbound_girdle|84|0||PoisonBurst76.Flat, SkillLevel.Flat, PoisonChance.Flat
Aaron's Golemheart|citrine_amulet|84|0||MinionCap.Flat, GolemAuraStack76.Flat, SkillLevel.Flat
Graxy's Tinderhands|leather_gloves_7|84|0||TrapSeed76.Flat, TrapCount.Flat, TrapChainRadius.Inc
Lizard's Quakestride|plate_boots_7|84|0||Trigger.Trigger, Damage.Inc, Area.Inc
Bina's Spotter's Helm|leather_helm_7|84|0||TotemCount.Flat, BallistaVolley76.Flat, CritChance.Inc
Brokkr's Whetstone|idol_seam|60|0||Damage.Inc, AttackSpeed.Inc, Str.Flat
Sindri's Coal|idol_ingot|60|0||DamageAsExtra.Flat, Damage.Inc
The Barrow King's Tally|idol_tunnel|60|0||MinionCap.Flat, MinionLife.Inc, MinionDamage.Inc
The Thane's Stormglass|idol_pick|60|0||Damage.Inc, Penetration.Flat, Resist.Flat
Millstone of Mardoth|idol_ancestor|60|0||OrbitCount.Flat, Damage.Inc, OrbitMovingDamage.Flat
Heartstone of the Deep|idol_pebble|60|0||MaxResist.Flat, Life.Inc
Siege-wright's Tally|idol_chisel|60|0||TotemSpeed.Inc, TotemLife.Inc
Oathkeeper's Spine|idol_pillar|70|0||Afterimages.Flat, Damage.Inc, MoveSpeed.Inc
Dwarven Rune of the Barrow Host|dwarven_rune|70|0||MinionCap.Flat, MinionLife.Inc, Life.Inc
Dwarven Rune of the Siege Line|dwarven_rune|70|0||TotemCount.Flat, TotemSpeed.Inc, MoveSpeed.Inc
Dwarven Rune of the Copper Vein|dwarven_rune|70|0||Chains.Flat, Damage.Inc, CastSpeed.Inc
Dwarven Rune of the Turning Mill|dwarven_rune|70|0||OrbitCount.Flat, Damage.Inc, Life.Inc
Dwarven Rune of the Twin Bolt|dwarven_rune|70|0||Projectiles.Flat, Damage.Inc, AttackSpeed.Inc
Dwarven Rune of the Deep Quake|dwarven_rune|70|0||WaveCount.Flat, Damage.Inc, AttackSpeed.Inc
Dwarven Rune of the Unbroken Ward|dwarven_rune|70|0||MaxResist.Flat, Armour.Inc, MoveSpeed.Inc
Dwarven Rune of the Forge-Tongue|dwarven_rune|70|0||DamageAsExtra.Flat, Damage.Inc, Resist.Flat
Dwarven Rune of the Hallowed Vigil|dwarven_rune|70|0||SkillLevel.Flat, Damage.Inc, AttackSpeed.Inc
Dwarven Rune of the Long Winter|dwarven_rune|70|0||OrbCount.Flat, Damage.Inc, Resist.Flat
Dwarven Rune of the Grave-Rot|dwarven_rune|70|0||SkillLevel.Flat, Penetration.Flat, Life.Inc
Dwarven Rune of the Snare Line|dwarven_rune|70|0||TrapCount.Flat, TrapRearm.Inc, MoveSpeed.Inc
The Vigil-Ember|idol_chisel|60|0||Damage.Inc, CastSpeed.Inc, Life.Flat
Rimeglass of the Deep Pass|idol_pebble|60|0||Damage.Inc, SkillDuration.Inc, Resist.Flat
The Engineer's Last Gear|idol_ingot|60|0||Damage.Inc, TotemSpeed.Inc, TotemLife.Inc
The Oathwarden's Chain|sunstone_amulet|84|0||Convert.Flat, Damage.Inc, ShockChance.Flat
Link of the Sundered Chain|idol_pick|84|0||Chains.Flat, Damage.Inc, AttackSpeed.Inc
Dwarven Rune of the Falling Sky|dwarven_rune|84|0||SkyfallRepeat.Flat, SkyfallDelay.Inc, Area.Inc
Deep-Forged Band|prismatic_ring|84|0||Life.Flat, Attributes.Flat, Resist.Flat
Deep-Forged Torc|onyx_amulet|84|0||Life.Flat, Damage.Inc, Resist.Flat
Deepwarden's Lantern|onyx_amulet|84|0||Life.Flat, Damage.Inc, Resist.Flat
Gravecut|greatsword_7|84|0||AddedDamage.Flat, Damage.Inc, AttackSpeed.Inc
Ossuary Stride|leather_boots_7|84|0||MoveSpeed.Inc, Life.Flat, Resist.Flat
The Unspoken Edge|sword1h_9|84|0||AddedDamage.Flat, Damage.Inc, AttackSpeed.Inc
Sheathbreaker Grips|leather_gloves_7|84|0||Life.Flat, AttackSpeed.Inc, Damage.Inc
Crown of the Unbroken|chain_helm_7|84|0|C|SkillLevel.Flat, MaxResist.Flat, DamageTaken.Inc
Heart of the Rupture|sunstone_amulet|84|0|C|SkillLevel.Flat, Attributes.Flat, Resist.Flat
Stride of the First Oath|chain_boots_7|84|0|C|MoveSpeed.Inc, SkillLevel.Flat, Life.Flat
The Mirror Oath|prismatic_ring|84|0|C|SkillLevel.Flat, AttackSpeed.Inc, CastSpeed.Inc
The Last Feast|oathbound_girdle|84|0|C|Life.Flat, LifeRegenPct.Flat, Resist.Flat
Mainspring Maul|mace1h_8|84|0||AddedDamage.Flat, Damage.Inc, AttackSpeed.Inc
Overclock Coil|wand_7|84|0||CastSpeed.Inc, Damage.Inc, CritChance.Inc
Cogwright's Grip|ritual_gloves_7|84|0||Life.Flat, AttackSpeed.Inc, Resist.Flat
Brass Heart Locket|sunstone_amulet|84|0||Life.Flat, Damage.Inc, Resist.Flat
Tickstep Treads|silk_boots_7|84|0||MoveSpeed.Inc, Life.Flat, Resist.Flat
The Hollow Star|silk_helm_7|84|0|C|SkillLevel.Flat, Damage.Inc, CastSpeed.Inc
Ashbrand of the Tyrant|greataxe_7|84|0|C|AddedDamage.Flat, Damage.Inc, AttackSpeed.Inc
The Regent's Thirst|prismatic_ring|84|0|C|Life.Flat, Damage.Inc, CritChance.Inc
Oath of the Last Jarl|sunstone_amulet|84|0|C|Block.Flat, MaxResist.Flat, Life.Inc
Hoarfrost Signet|prismatic_ring|84|0|C|SkillLevel.Flat, Damage.Inc, CastSpeed.Inc
The Glacier's Oath|greatsword_7|84|0|C|AddedDamage.Flat, Damage.Inc, AttackSpeed.Inc
Rime of the Long Watch|plate_helm_7|84|0|C|Life.Flat, Armour.Inc, MaxResist.Flat
Wild Trog's Thunderchord|wand_7|84|0||TrogChord100.Flat, TrogNote100.Flat, SkillLevel.Flat
Grasp of the Sworn|plate_gloves_8|84|0|C|CritChance.Inc, CritMulti.Flat, AttackSpeed.Inc
The Keeper's Ember|sunstone_amulet|84|0|C|MinionDamage.Inc, MinionLife.Inc, SkillLevel.Flat
The Long Battery|oathbound_girdle|78|4||TotemCount.Flat, Damage.Inc, TotemSpeed.Inc
Warwright's Seal|cinderstone_ring|72|20||Damage.More, SkillDuration.Inc, CritChance.Inc
Vigil of the Last Flame|emberglow_amulet|76|20||TickRate.Inc, Damage.Inc, SkillLevel.Flat
The Motley Court|wardweave_sash|72|20||MinionKindMore.Flat, MinionDamage.Inc, MinionLife.Inc
The Slow Verdict|bloodstone_ring|60|20||DotMulti.Flat, AilmentDuration.Inc, PoisonChance.Flat
The Hangman's Patience|veilglass_amulet|68|20||EngineHoldWhileSentenced.Flat, BloodlustMax.Flat, CurseEffect.Inc
Templar's Troth|prismatic_ring|64|20||VowEffect.Inc, Damage.Inc, Mana.Flat
The Oath Unspoken|heartblood_ring|80|1||SkillLevel.Flat, Damage.More, Attributes.Flat
Quarrybreaker Fists|plate_gloves_4|40|25||WaveCount.Flat, Damage.Inc, Str.Flat
Tearmonger's Greaves|plate_boots_4|40|25||FuryOnKill59.Flat, BleedChance.Flat, BleedDamage.Inc
Jarl's Roarhelm|plate_helm_4|40|25||Trigger.Trigger, Block.Flat, LifeOnBlock.Flat
Stormglass Circlet|silk_helm_3|32|25||Chains.Flat, ShockSpreadOnKill.Flat, Damage.Inc
Wildfire Coil|amethyst_ring|30|25||IgniteSpreadOnKill.Flat, IgniteChance.Flat, IgniteDamage.Inc
Hoarfrost Reliquary|tome_4|44|0||OrbCount.Flat, Damage.Inc, ChillEffect.Inc
Thunderhide Quiver|stormfeather_quiver|45|4||Chains.Flat, ShockChance.Flat, Damage.Inc
Adder's Kiss|leather_gloves_4|40|25||PoisonSpreadOnKill.Flat, PoisonChance.Flat, PoisonDamage.Inc
Siegewatch Hood|leather_helm_4|40|0||TotemCount.Flat, TotemSpeed.Inc, Damage.Inc
Windstep Tabi|leather_boots_4|40|25||Afterimages.Flat, Damage.Inc, MoveSpeed.Inc
Snarewright's Sash|crystal_belt|40|0||TrapCount.Flat, TrapRearm.Inc, Damage.Inc
Hollow Moon Signet|twostone_ring|40|0||Projectiles.Flat, Damage.Inc, Dex.Flat
Hammerbearer's Relic|agate_amulet|34|0||OrbitCount.Flat, Damage.Inc, Damage.Inc
Pyrewarden's Mantle|plate_chest_4|40|0||IgniteStacks.Flat, IgniteChance.Flat, Damage.Inc
Dawnwall Bulwark|shield_10|46|0||Trigger.Trigger, Block.Flat, LifeOnBlock.Flat
Frostcaller Lantern|seer_pendant|28|0||MinionCap.Flat, Convert.Flat, MinionDamage.Inc
Grave Psalter|tome_3|36|25||DeathBurst.Flat, Damage.Inc, LifeLeech.Flat
The Red Carousel|bloodbound_girdle|50|20||Trigger.Trigger, BleedChance.Flat, BleedDamage.Inc
Rotmother's Cradle|sunstone_amulet|54|20||Convert.Flat, MinionDamage.Inc, Damage.Inc
The Penitent Knuckle|bloodstone_ring|58|0||Trigger.Trigger, BleedChance.Flat, Damage.Inc
Vigil of the Storm Saint|duskstone_amulet|62|0||Trigger.Trigger, Block.Flat, ShockChance.Flat
The Dervish Ossuary|wardweave_sash|72|0||Trigger.Trigger, MinionSpeed.Inc, MinionDamage.Inc
Kitsune-Fire Claws|ct_rend_claw_7|76|25||Convert.Flat, IgniteStacks.Flat, IgniteChance.Flat, AttackSpeed.Inc|u200_kitsune_fire_claws
Vortexbinder Obi|wardweave_sash|72|70||Trigger.Trigger, OrbitRate.Inc, Damage.Inc, Dex.Flat|u200_vortexbinder_obi
Wraithweave Cloak|leather_chest_7|82|25||EvasionMoreMoving113.Flat, EvadeRestoreLife113.Flat, Evasion.Inc, Life.Flat|u200_wraithweave_cloak
Moss-Ward Cowl|leather_helm_7|82|25||EvasionAsEnergyShield113.Flat, Evasion.Inc, EnergyShield.Flat, Life.Flat|u200_moss_ward_cowl
Spirit-Silk Kimono|silk_chest_7|82|25||EvasionAsEnergyShield113.Flat, EsRechargeDelay.Inc, Evasion.Inc, EnergyShield.Flat|u200_spirit_silk_kimono
Arcanist's Overflow|veilglass_amulet|72|25||ManaAsAddedLightning113.Flat, Mana.Inc, Int.Flat, ManaRegen.Inc|u200_arcanist_s_overflow
The Bastion Psalm|plate_chest_7|82|25||ArmourAsAddedHolyPermille113.Flat, Defences.Inc, Life.Flat, Resist.Flat|u200_the_bastion_psalm
Hallowed Cinderfall|ash_greatmace_7|78|70||Convert.Flat, HolyVsBurningTaken113.Inc, IgniteChance.Flat, Damage.Inc|u200_hallowed_cinderfall
Bloodfire Wand|ash_wand_7|76|70||EnergyShieldLeech.Flat, EsLeechInstantVsBurning113.Flat, Damage.Inc, CastSpeed.Inc|u200_bloodfire_wand
Gale-Feather Boots|leather_boots_7|82|70||VaultResetOnRareKill113.Flat, MoveSpeed.Inc, Evasion.Flat, Resist.Flat|u200_gale_feather_boots
Stormcaller's Fletching|ct_volley_stormfeather_quiver|62|70||ChainNoLossVsShocked113.Flat, Damage.Inc, Dex.Flat, ShockChance.Flat|u200_stormcaller_s_fletching
Moon-Leap Greaves|leather_boots_7|82|70||FuryOnMoonfallHit113.Flat, CooldownRecovery.Inc, MoveSpeed.Inc, Evasion.Flat|u200_moon_leap_greaves
The Prismatic Codex|ct_lore_tome_5|70|25||Convert.Flat, ShockFromChillPct113.Flat, ChillEffect.Inc, EnergyShield.Flat|u200_the_prismatic_codex
Communion Mace|ash_mace1h_8|80|70||EnergyShieldLeech.Flat, EsLeechMoreInHallowed113.Flat, Damage.Inc, EnergyShield.Flat|u200_communion_mace
Bonebreaker Wraps|plate_gloves_7|82|70||GrantSupport.Flag, CritVsMaimed113.Flat, CritMulti.Flat, Str.Flat|u200_bonebreaker_wraps
Mamushi Knuckles|ct_knuckle_fist_6|74|70||PoisonChance.Flat, PoisonDurVsMaimed113.Flat, GrantSupport.Flag, AttackSpeed.Inc|u200_mamushi_knuckles
Ninefold Quiver|volley_quiver|84|0|C|Damage.Inc, Life.Flat, EntropyMarksFewer.Flat, EntropyMarksKept.Flat|chaos_ninefold_quiver
The Sundered Vow|shield_15|84|0|C|Block.Flat, Defences.Inc, Life.Flat, EntropyVowRest.Flat|chaos_sundered_vow
Debtor's Maul|greatmace_7|84|0|C|AddedDamage.Flat, Damage.Inc, EntropySlamReach.Flat, EntropySlamMore.Flat|chaos_debtors_maul
Starless Crown|silk_helm_6|84|0|C|EnergyShield.Flat, EntropyCritMore.Flat, EnergyShield.More|chaos_starless_crown
The Debt Collector|tome_5|84|0|C|MinionLife.Inc, EntropyShare.Flat, EntropyCorpseReach.Flat|chaos_debt_collector
Heart of Entropy|emberglow_amulet|84|0|C|BurstGen.Flat, EntropyMulti.Flat|chaos_heart_of_entropy
Silent Scabbard|sword1h_9|84|0|C|AddedDamage.Flat, Damage.Inc, AttackSpeed.Inc, EntropySheatheReach.Flat|chaos_silent_scabbard
Stormfrost Band (Primal)|garnet_ring|68|1|P|Convert.Flat, Chains.Flat, Penetration.Flat, Mana.Flat
Stormweaver's Coil (Primal)|topaz_ring|68|1|P|Chains.Flat, Damage.Inc, Keystone.Flag, Mana.Flat
Webspinner Gloves (Primal)|leather_gloves_2|68|1|P|Chains.Flat, Damage.Inc, Trigger.Trigger, Evasion.Flat
Windwhisper (Primal)|fletchers_quiver|68|1|P|Projectiles.Flat, CritChance.Inc, MoveSpeed.Inc, Dex.Flat
Shadowsilk Wraps (Primal)|leather_gloves_2|68|1|P|OrbitMax.Flat, OrbitMovingDamage.Flat, Evasion.Inc, AttackSpeed.Inc
The Long Battery (Primal)|oathbound_girdle|78|1|P|TotemCount.Flat, Damage.Inc, TotemSpeed.Inc, TotemLife.Inc
Wintercall Orb (Primal)|moonstone_amulet|68|1|P|OrbCount.Flat, Damage.Inc, Damage.Inc, Int.Flat
The Third Thunder (Primal)|moonsilver_ring|68|1|P|BrandCount.Flat, SkillDuration.Inc, CastSpeed.Inc, Mana.Flat
Dreadcrown (Primal)|silk_helm_4|68|1|P|CurseLimit.Flat, CurseEffect.Inc, Reservation.Inc, EnergyShield.Inc
Ashen Crown (Primal)|silk_helm_2|68|1|P|Projectiles.Flat, CastSpeed.Inc, Damage.Inc, EnergyShield.Flat
Orrery of the Long Night (Primal)|silk_helm_4|68|1|P|OrbCount.Flat, SkillDuration.Inc, Damage.More, Damage.Inc
The Charnel Bell (Primal)|bone_talisman|68|1|P|MinionCap.Flat, MinionDeathBurst.Flat, MinionLife.More, Str.Flat
Ironroot Signet (Primal)|copper_band|68|1|P|TotemCount.Flat, TotemLife.Inc, TotemSpeed.Inc, SkillDuration.Inc
Stormglass Circlet (Primal)|silk_helm_3|68|1|P|Chains.Flat, ShockSpreadOnKill.Flat, Damage.Inc, Int.Flat
Windstep Tabi (Primal)|leather_boots_4|68|1|P|Afterimages.Flat, Damage.Inc, MoveSpeed.Inc, Life.Inc
The Thousand Sparks (Primal)|silk_gloves_4|68|1|P|BrandCount.Flat, SkillDuration.More, Damage.More, Damage.Inc
The Widow's Patience (Primal)|ritual_gloves_6|76|1|P|TrapCount.Flat, TrapRearm.Inc, AttackSpeed.Inc, CastSpeed.Inc
Thunderwake Maul (Primal)|mace1h_2|68|1|P|OrbitCount.Flat, OrbitMovingDamage.Flat, DamageAsExtra.Flat, Block.Flat
Thunderhide Quiver (Primal)|stormfeather_quiver|68|1|P|Chains.Flat, ShockChance.Flat, Damage.Inc, Dex.Flat
Runehollow Idol|idol_pillar|84|0|C|Attributes.Flat, Resist.Flat|u200_rune_hollow_idol
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_fire
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_lightning
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_cold
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_arcane
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_poison
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_physical
The Split Aspect|idol_ancestor|84|0|C|SplitAspect124.Flat, Attributes.Flat, CooldownRecovery.Inc|u200_the_split_aspect_void
The Wyrmling's Second Heart|idol_ancestor|84|0|C|AspectEffect124.Flat, Life.Inc, Attributes.Flat|u200_the_wyrmling_s_second_heart
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_chain_reaction_iron_resolve
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_chain_reaction_blood_magic
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_chain_reaction_elemental_overload
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_chain_reaction_spellblade
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_chain_reaction_hollow_covenant
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_iron_resolve_blood_magic
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_iron_resolve_elemental_overload
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_iron_resolve_spellblade
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_iron_resolve_hollow_covenant
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_blood_magic_elemental_overload
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_blood_magic_spellblade
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_blood_magic_hollow_covenant
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_elemental_overload_spellblade
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_elemental_overload_hollow_covenant
Oathstone of the Nameless King|sunstone_amulet|84|0|C|Keystone.Flag, SkillLevel.Flat, Attributes.Flat|u200_oathstone_of_the_nameless_king_spellblade_hollow_covenant
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_chain
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_channel_conduit
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_fork
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_hunters_mark_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_ice_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_maim
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_afterimage_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_channel_conduit
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_fork
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_hunters_mark_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_ice_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_maim
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_chain_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_fork
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_hunters_mark_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_ice_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_maim
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_channel_conduit_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_hunters_mark_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_ice_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_maim
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_fork_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_ice_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_maim
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_hunters_mark_support_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_maim
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ice_support_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_maim_rain_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_maim_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_maim_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_maim_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_maim_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_maim_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_rain_support_ravening_host
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_rain_support_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_rain_support_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ravening_host_skyfall
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ravening_host_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ravening_host_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_ravening_host_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_skyfall_spell_echo
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_skyfall_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_spell_echo_tether
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_spell_echo_zap_support
Hands of the Gemwright|plate_gloves_8|84|0|C|GrantSupport.Flag, AttackSpeed.Inc, CastSpeed.Inc|u200_hands_of_the_gemwright_tether_zap_support
The Roadless Stride|chain_boots_7|84|0|C|Cooldown.Inc, MoveUseCostPct124.Flat, MoveSpeed.Inc, Life.Flat|u200_the_roadless_stride
Sentence of the Ninth Bell|idol_pick|84|0|C|PoisonNoExpire124.Flat, BellToll124.Flat, PoisonDamage.Inc, PoisonChance.Flat|u200_sentence_of_the_ninth_bell
The Eighth Blade Ornament|idol_seam|84|0|C|OrbitCount.Flat, BladeVolley124.Flat, OrbitMovingDamage.Flat, CritMulti.Flat|u200_the_eighth_blade_ornament
The Hollow Throne|idol_ancestor|84|0|C|MinionCap.Flat, WoeOnSkillHit114.Flat, MinionLife.Inc, CritChance.Inc|u200_the_hollow_throne
Ninth Hammer Shard|idol_chisel|84|0|C|OrbitMax.Flat, HammerChorus124.Flat, OrbitMovingDamage.Flat, OrbitRate.Inc|u200_ninth_hammer_shard
The Avalanche Edict|idol_pillar|84|0|C|FissureSpikes.Flat, SpikeErupt124.Flat, WaveCount.Flat, Damage.Inc|u200_the_avalanche_edict
The Twinfletch Idol|idol_tunnel|84|0|C|Projectiles.Flat, Pierce.Flat, PierceMore124.Flat, Dex.Flat|u200_the_twin_fletch_idol
Gloomsilver Reliquary|plate_chest_7|84|0|C|ReliquaryEffect124.Flat, Resist.Flat, Life.Flat|u200_gloomsilver_reliquary
Core-Splinter Idol|idol_seam|84|0|C|CoreSplinter124.Flat, Attributes.Flat, Life.Flat|u200_core_splinter_idol
Slimeheart Idol|idol_pebble|84|0|C|SlimeBurst124.Flat, Damage.More, ItemRarity.Inc, MoveSpeed.Inc|u200_slimeheart_idol
Scab of the Wound|veilglass_amulet|84|0|C|LifeCap124.Flat, AlwaysLowLife124.Flat, ScabEs124.Flat, Damage.Inc, EnergyShield.Inc|u200_scab_of_the_wound
The Last Square|plate_boots_7|84|0|C|NoMoveSkill124.Flat, PlantedLess124.Flat, Damage.Inc, Life.Flat|u200_the_last_square
Seal of the Pyromancer|idol_ancestor|80|5||Dragonling.Flag, Int.Flat, IgniteDamage.Inc|u200_seal_of_the_pyromancer
Seal of the Plague Lord|idol_ancestor|80|5||Dragonling.Flag, Int.Flat, PoisonDamage.Inc|u200_seal_of_the_plague_lord
Heart of the Earthbreaker|idol_ancestor|80|5||Dragonling.Flag, Str.Flat, Life.Inc|u200_heart_of_the_earthbreaker
Seal of the Skyhunter|idol_ancestor|80|5||Dragonling.Flag, Dex.Flat, AttackSpeed.Inc|u200_seal_of_the_skyhunter
Bloodmoon Hakama|leather_chest_7|82|70||LifeLeech.Flat, CritRestoreLife113.Flat, Evasion.Inc, Life.Flat|u200_bloodmoon_hakama
Wyrmhide Coat|brigandine_chest_7|82|25||Life.Flat, Resist.Flat, Armour.Inc, MoveSpeed.Inc|u200_wyrmhide_coat
Seraphfall Mail|chain_chest_7|82|25||EnergyShield.Flat, Armour.Inc, Resist.Flat, Mana.Flat, CastSpeed.Inc|u200_seraphfall_mail
Hollow Saint's Garb|ritual_chest_7|82|25||Evasion.Inc, EnergyShield.Flat, MoveSpeed.Inc, CritChance.Inc|u200_hollow_saint_garb
Cinderfall Greathelm|ash_plate_helm_7|82|30||Life.Flat, Resist.Flat, Attributes.Flat, Armour.Inc|u200_cinderfall_greathelm`;
const UNIQUES=(UNIQUE_SRC+"\n"+UNIQUE_EXTRA).split("\n").map(l=>{const p=l.split("|");return{name:p[0],base:BASE_BY_ID[p[1]],lvl:+p[2],w:+p[3],flag:p[4],stats:p[5],id:p[6]||""};}).filter(u=>u.base);
const rnd=n=>Math.floor(Math.random()*n),pick=a=>a[rnd(a.length)];
function wpick(a,wf){let t=0;a.forEach(x=>t+=wf(x));let r=Math.random()*t;for(const x of a){r-=wf(x);if(r<=0)return x;}return a[a.length-1];}
/* categories a drop can fall into, one pick per category before the base is chosen */
const CATKEYS=[];BASES.forEach(b=>{const k=b.kind+":"+b.sub;if(!CATKEYS.includes(k))CATKEYS.push(k);});
const MISC=["Rune of Reid","Gold","Currency","Flask","Skill Gem","Support Gem"];
/* an affix tier needs an item level (the real levels per tier come from the game files) */
function tierLvl(a,k){if(a.lv&&a.lv[k-1]!==undefined)return a.lv[k-1];return a.n===1?a.hi:Math.round(a.hi+(a.lo-a.hi)*(k-1)/(a.n-1));} /* real item levels from the game files; the even spread is only a fallback */
/* tier choice for one affix; mode: any (lower tiers likelier, a guess), t1, t2 (T1-T2), bad (the two lowest tiers) */
function tierPick(a,lvl,mode){
  const ok=[];for(let t=1;t<=a.n;t++)if(tierLvl(a,t)<=lvl)ok.push(t);
  if(!ok.length)ok.push(a.n);
  let c=ok;
  if(mode==="t1")c=ok.filter(t=>t===1);else if(mode==="t2")c=ok.filter(t=>t<=2);else if(mode==="bad")c=ok.filter(t=>t>=a.n-1);
  if(mode&&mode!=="any")return c.length?c[rnd(c.length)]:(mode==="bad"?a.n:ok[0]);
  return wpick(ok,t=>t);
}
/* tp: {top:n lines forced to tiers[T1 or T1-T2], rest:mode for every other line} */
function rollMods(tags,lvl,want,maxEach,tp){
  tp=tp||{};
  const pool=AFF.filter(a=>!/_pen95_/.test(a.id)&&a.tags.some(t=>tags.includes(t))&&!a.ex.some(t=>tags.includes(t))&&a.lo<=lvl); /* pen95 lines are loaded only while a game switch is on (bPen95): Easy Mode knows their tiers, but they do not drop in the test */
  const mods=[],used=new Set();let p=0,s=0;
  const add=(a,mode)=>{
    used.add(a.group);a.type==="P"?p++:s++;
    const tier=tierPick(a,lvl,mode);
    mods.push({id:a.id,pre:a.type==="P"?1:2,lineLabel:LINEN[a.id]||LINEN[idolLineId(a.id)]||"",group:a.group,tier,tiers:a.n,lines:LINEMAP[a.group]||[]});
  };
  const full=a=>used.has(a.group)||(a.type==="P"?p>=maxEach:s>=maxEach);
  if(tp.top){ /* forced good lines first, from affixes that can reach T1 at this item level */
    let fp=pool.filter(a=>tierLvl(a,1)<=lvl);const multi=fp.filter(a=>a.n>1);if(multi.length>=tp.top)fp=multi;
    for(let k=0;k<tp.top*8&&mods.length<tp.top&&fp.length;k++){const a=wpick(fp,x=>x.w);if(!full(a))add(a,tp.tiers===1?"t1":"t2");}
  }
  for(let k=0;k<want*6&&mods.length<want&&pool.length;k++){const a=wpick(pool,x=>x.w);if(!full(a))add(a,tp.rest||"any");}
  return mods;
}
/* quick-spawn classes: rarity, how the lines are rolled, how many lines are forced good */
const CLASSES={
  white:{label:"White",rar:"N"},
  magicgood:{label:"Magic good",rar:"M",rest:"t2",hi:1},
  magicbad:{label:"Magic bad",rar:"M",rest:"bad"},
  rarevaluable:{label:"Rare valuable",rar:"R",top:"n",tiers:1,hi:1},
  raredecent:{label:"Rare decent",rar:"R",top:2,tiers:2,hi:1},
  rarebad:{label:"Rare bad",rar:"R",rest:"bad"},
  raremid:{label:"Rare mid",rar:"R"},
  unique:{label:"Unique / Red",rar:"U"},
  idol:{label:"Idol",rar:"I"}
};
function genItem(f){
  f=f||{};const cl=f.cls?CLASSES[f.cls]:null;
  const x=Math.random()*100;
  if(!cl&&x<10){const mn=pick(MISC),rune=mn==="Rune of Reid",rt=1+rnd(6);return{id:uid(),name:rune?"Rune of Reid (tier "+rt+")":mn,gem:/ Gem$/.test(mn),rune,rtier:rt,kind:"misc",rar:"X",lvl:1,mods:[],sub:"",core:false,sockets4Plus:false,truesworn:false,runebase:false,sock:0,grade:0,req:1,label:rune?"rune · tier "+rt:"never hidden"};}
  const rar=cl?(cl.rar==="I"?(Math.random()<.5?"M":"R"):cl.rar):x<44?"N":x<72?"M":x<94?"R":"U";
  if(rar==="U"){
    const u=pick(UNIQUES),b=u.base; /* every red is equally likely, so every named red can be tested */
    const sk=Math.random()<.06?4+rnd(3):rnd(4);
    return{id:uid(),name:u.name,def:defOf(b.tags),baseId:b.id,redId:u.id||redIdOf(u.name),kind:b.kind,sub:b.sub,rar:"U",lvl:u.lvl,mods:[],core:false,sock:sk,sockets4Plus:sk>=4,truesworn:false,runebase:false,grade:0,req:Math.max(1,Math.round(u.lvl*.8)),unsworn:Math.random()<.12,chase:CHASE.has(u.name),label:b.name+" · "+u.stats+(u.flag==="P"?" · primal":u.flag==="S"?" · signature":u.flag==="C"?" · chase":"")};
  }
  const key=cl?(cl.rar==="I"?"idol:":pick(CATKEYS.filter(k=>k!=="idol:"))):pick(CATKEYS);
  let lvl=1+rnd(84);if(cl&&cl.hi)lvl=84;if(cl&&f.lvl)lvl=f.lvl; /* T1 and T2 of most affixes only roll at the top item level */
  let cand=BASES.filter(b=>b.kind+":"+b.sub===key&&b.lvl<=lvl&&b.lvl>=lvl-35);
  if(!cand.length)cand=BASES.filter(b=>b.kind+":"+b.sub===key&&b.lvl<=lvl);
  if(!cand.length)cand=BASES.filter(b=>b.kind+":"+b.sub===key).slice(0,1);
  const idolPool=f.size?BASES.filter(q=>q.kind==="idol"&&q.tags.includes("Idol"+f.size)):null;
  let b=key.startsWith("idol:")?wpick(idolPool&&idolPool.length?idolPool:BASES.filter(q=>q.kind==="idol"),q=>({idol_pebble:26,idol_chisel:15,idol_ingot:15,idol_pick:10,idol_seam:10,idol_pillar:7,idol_tunnel:7,idol_ancestor:10})[q.id]||10):pick(cand);
  {const vs=VARIANTS[b.id];if(vs&&Math.random()<.08)b=pick(vs);else if(SPECIAL.length&&b.kind!=="idol"&&Math.random()<.02)b=pick(SPECIAL);}
  let mods=[];
  const tp=cl?{top:cl.top==="n"?f.n:cl.top,tiers:cl.tiers,rest:cl.rest}:null;
  if(rar==="M")mods=rollMods(b.tags,Math.max(lvl,b.lvl),1+rnd(2),1,tp);
  if(rar==="R")mods=rollMods(b.tags,Math.max(lvl,b.lvl),Math.min(6,Math.max(3+rnd(3),tp&&tp.top||0)),3,tp);
  const nm={N:"Normal",M:"Magic",R:"Rare"}[rar];
  const sock=Math.random()<.06?4+rnd(3):rnd(4),tw=Math.random()<.05,il=Math.max(lvl,b.lvl);
  return{id:uid(),name:nm+" "+b.name,def:defOf(b.tags),baseId:b.id,kind:b.kind,sub:b.sub,rar,lvl:il,mods,core:b.variant==="ct"||Math.random()<.04,cls:cl?(cl.rar==='I'?'Idol size '+f.size:cl.label+(cl.top==='n'?' '+mods.filter(m=>m.tier===1).length+'×T1'+(mods.filter(m=>m.tier===1).length<f.n?' (asked '+f.n+')':''):'')):'',sock,sockets4Plus:sock>=4,truesworn:tw,grade:tw?90+rnd(11):1+rnd(89),req:Math.max(1,Math.round(il*.8)),unsworn:rar==="R"&&Math.random()<.12,runebase:rar==="N"&&Math.random()<.2,label:""};
}


/* presets */
const USER_CODE="BOFILTER:1,4|1,13,0,0,0,3,0,0,0,255|1,4,1,0,0,1,0,0,0,255|1,16,3,6,0,2,0,0,0,255|1,0,4,7,0,3,0,2,1,255|1,0,4,0,5,3,0,0,0,255|1,0,4,6,0,2,1,1,2,255|1,0,4,4,0,0,0,0,0,255|1,0,3,0,0,0,0,0,0,255";
/* the game's five built-in presets (ids 0-4), as listed by the community Broken Oath Builder */
const GAME_PRESETS=[
 ["All loot","BOFILTER:1,0|1,13,0,0,0,3,0,0,0,255"],
 ["Tidy","BOFILTER:1,1|1,13,0,0,0,3,0,0,0,255|1,4,1,0,0,1,0,0,0,255|1,16,3,0,0,2,0,0,0,255|1,0,1,0,0,0,0,0,0,255"],
 ["Strict","BOFILTER:1,2|1,13,0,0,0,3,0,0,0,255|1,4,1,0,0,1,0,0,0,255|1,16,3,6,0,2,0,0,0,255|1,0,3,0,0,0,0,0,0,255|1,0,4,6,0,3,0,0,0,255"],
 ["Very strict","BOFILTER:1,3|1,13,0,0,0,3,0,0,0,255|1,4,1,0,0,1,0,0,0,255|1,16,3,6,0,2,0,0,0,255|1,0,3,0,0,0,0,0,0,255|1,0,4,3,0,0,0,0,0,255|1,3,4,6,0,3,2,0,0,255|1,0,4,0,5,3,0,0,0,255"],
 ["End Game",USER_CODE]
];
const PRESETS=GAME_PRESETS.map(p=>({label:p[0],build:()=>decode(p[1]).filter}));

/* state */
let F={preset:"-1",rules:[]};
const LVSTEPS=[10,20,30,40,50,60,68,70,75,80,84,90];
const rngText=(lo,hi,w)=>lo&&hi?w+" "+lo+"–"+hi:lo?w+" "+lo+"+":hi?w+" up to "+hi:"";
/* ---- Easy Mode v1 ----
   Builds a whole filter from a few controls. Only uses things confirmed in the game data or the game's own exports:
   named lines with a= (max 6 per rule), i= item level steps, type 14 for Idols (type 0 does not cover Idols).
   Named lines match by their text, so a gear line such as spell_inc also catches the Idol line with the same text.
   Gems only through the optional Hide/Sell gems setting, no roll quality, no line 1..26 guesses. The state lives in its own storage key; the filter code carries nothing of it. */
/* ---- Rare Ashen (ash_*) and Gnome-made (gm_*) highlight block ----
   Both families drop as Normal, Magic and Rare and the filter sees them (Mathies, in game, 25.11.2026). Only Rare is protected: 9 Rare Highlight rules, 1 for the gm_ ids and 8 for the ash_ ids (12 bases per rule at most, 7x12 + 1x9).
   The lists come from the base ids of the local game data (Build 90: 646 bases, 93 ash_, 6 gm_), read case-insensitively. Order: below the tier and affix highlights (a Rare with T1 lines keeps its tier colour), above every Hide and Sell. */
const GA_COLOUR=6; /* Ash: a colour no tier layer uses */
const gaIds=pre=>DATA.bases.map(x=>String(x[0]).toLowerCase()).filter(i=>i.startsWith(pre)).sort();
const GA_GM=gaIds("gm_"),GA_ASH=gaIds("ash_"),GA_IDS=new Set(GA_GM.concat(GA_ASH));
function gaRules(){
  const out=[],mkr=(ids,name)=>{const r=newRule({type:0,rarity:4,action:2,colour:GA_COLOUR});r.name=name.slice(0,NAME_MAX);msetList(r,"b",ids);out.push(r);};
  for(let i=0;i<GA_GM.length;i+=MAXL.b)mkr(GA_GM.slice(i,i+MAXL.b),"Gnome-made Rares");
  const n=Math.ceil(GA_ASH.length/MAXL.b);
  for(let i=0;i<GA_ASH.length;i+=MAXL.b)mkr(GA_ASH.slice(i,i+MAXL.b),"Ashen Rares "+(i/MAXL.b+1)+"/"+n);
  return out;
}
const isGaRule=r=>r.type===0&&r.rarity===4&&r.action===2&&!r.line&&!r.quality&&!r.count&&!r.level&&r.m.length===1&&r.m[0][0]==="b"&&mlist(r,"b").length>0&&mlist(r,"b").every(i=>GA_IDS.has(i));
/* a Hide / Sell rule that could swallow a Rare Ashen or Gnome-made base: gear types only, no base list that leaves them out */
const hidesGaRares=r=>(r.action===0||r.action===4)&&r.on!==0&&!!RAR[r.rarity]&&RAR[r.rarity].includes("R")&&![14,17,33].includes(r.type)&&(()=>{const b=mlist(r,"b");return !b.length||mval(r,"nb")==="1"||b.some(i=>GA_IDS.has(i));})();
const affixHighlight=r=>r.on!==0&&(r.action===2||r.action===3)&&!!RAR[r.rarity]&&RAR[r.rarity].includes("R")&&!isGaRule(r)&&(!!mlist(r,"a").length||!!mval(r,"t")||!!r.line||!!r.quality||!!r.count);
/* what the compilers and the export check guarantee. level "error" = never export as it is; "warn" = tell the person. Nothing here deletes or edits a rule. */
function rulesIssues(rules){
  const out=[],ga=[];rules.forEach((r,i)=>{if(isGaRule(r))ga.push(i);});
  rules.forEach((r,i)=>{
    if(ruleClash(r))out.push({i,level:"error",code:"clash",text:"Rule "+(i+1)+": none of these (nb / nr) cannot be combined with All of them or Any N."});
    if(anOnBasesOrReds(r))out.push({i,level:"error",code:"an-list",text:"Rule "+(i+1)+": Any N works on named lines only, not on bases or reds."});
    if(r.on!==0&&r.action===4&&r.type===33)out.push({i,level:"error",code:"sell-33",text:"Rule "+(i+1)+": Sell does not work on Normal or Magic Dwarven Runes (in game, 25.11.2026). Use Hide for them."});
    if(r.on!==0&&r.action===4&&r.type===17)out.push({i,level:"warn",code:"sell-17",text:"Rule "+(i+1)+": this Sell rule sells gems, also the ones you could still use."});
    if(r.on!==0&&(r.action===0||r.action===4)&&r.rarity===0&&![14,17,33].includes(r.type)&&!(r.m&&r.m.length))out.push({i,level:"warn",code:"rarity0",text:"Rule "+(i+1)+": "+(r.action===4?"Sell":"Hide")+" with Any rarity also catches Rare gear."});
  });
  if(ga.length){
    const first=ga[0],last=ga[ga.length-1];
    rules.forEach((r,i)=>{
      if(i<last&&hidesGaRares(r))out.push({i,level:"error",code:"ga-below-hide",text:"Rule "+(i+1)+" hides or sells Rare gear above the Rare Ashen / Gnome-made highlight (rule "+(first+1)+"), so those drops are lost."});
      if(i>first&&affixHighlight(r))out.push({i,level:"error",code:"ga-above-tier",text:"Rule "+(i+1)+" is a tier or affix highlight below the Rare Ashen / Gnome-made block (rule "+(first+1)+"): Rares with good rolls would only get the base colour."});
    });
  }
  return out;
}
const EZ_KEY="oathfilter-easy";
/* g: gear lines (type 0). Idol rules use the gear lines whose text also exists on Idols, plus the Idol-only lines in "idol". */
/* The group lines live in data/easy-mode-groups.json (editable on GitHub). Ids the game data does not know are dropped with a console warning, so a typo cannot break the page. */
const EZ_DATA=EZ_JSON;
const EZ_KNOWN=new Set(DATA.lines.map(x=>x[1]));
const EZ_EXCLUDED=EZ_DATA.excluded||[];
const EZ_EXCL=new Set(EZ_EXCLUDED);
const EZ_ARCH=EZ_DATA.groups.map(g=>{const ok=id=>(EZ_KNOWN.has(id)||/^idol_/.test(id))&&!EZ_EXCL.has(id);const bad=g.ids.concat(g.idol).filter(id=>!ok(id));if(bad.length&&typeof console!=="undefined")console.warn("easy-mode-groups.json: unknown or excluded line id(s) in "+g.k+": "+bad.join(", "));return{...g,ids:g.ids.filter(ok),idol:g.idol.filter(ok)};});
/* Style-bound element lines. A line tagged "spell" or "attack" only stays when that style is picked (or no style is picked). Everything else of a picked element stays. */
const EZ_ST=EZ_DATA.st;
const EZ_ATK=["attack","melee","slam","bow"];
const EZ_GRP=[["Playstyle","play",[["",["attack","spell","minion","melee","slam","bow","trap","totem"]]]],["Damage","dmg",[["Damage types",["phys","fire","cold","light","pois","holy"]],["Ailments",["bleed","ign","chaos"]]]],["Defences","def",[["",["life","armour","evasion","es","res"]]]],["Utility","util",[["",["aoe","chain","channel","orbit","curse","move","mana","leech"]]]]]; /* every chip id stays; only the grouping changed */
const EZ_RL=[["0","Any"]].concat(LVSTEPS.filter(v=>v<=84).map(v=>[String(v),String(v)])); /* Rupture Level = monster level = drop (item) level; it decides which affix tiers can drop */
const EZ_KEEP=[["1","Best tier only"],["2","Best 2 tiers"],["3","Best 3 tiers"]]; /* how many of the tiers that can drop at that level a rule keeps */
const EZ_TMAX=8; /* highest T{n} the game's Tier list offers */
const EZ_LINEIDS=new Set(DATA.lines.map(x=>x[1]));
const EZ_IDOLTXT=new Set(Object.keys(LINEN).filter(k=>k.indexOf("idol_")===0).map(k=>LINEN[k]));
const ezDef=()=>({rl:0,tk:2,hl:1,idol:"match",hn:1,hm:1,hs:0,gems:0,ga:1,hr:0,st:0,band:0,pre:"",arch:{},keep:{core:1,runes:1,tsw:1}}); /* band: Leveling level band, 0 Any, 1 = 1-31, 2 = 32-55, 3 = 56-74 (see EZ_BANDS); st: strictness extras for a filter without picks, 0 none, 1 hide Rare gear under item level 75, 2 keep only top-roll Rares from item level 82. gems: 0 no Gems rule (default, so old saves and codes do not change), 1 hide gems, 2 sell gems (game: a gem under a Gems Sell rule is sold on landing) */
function ezSane(o){
  o=o&&typeof o==="object"?o:{};const d=ezDef();
  const n=(v,lo,hi,df)=>{v=Math.round(+v);return Number.isFinite(v)?Math.min(hi,Math.max(lo,v)):df;};
  const on=(v,df)=>v===undefined?df:(v?1:0);
  const s={rl:+o.rl===90?84:LVSTEPS.includes(+o.rl)?+o.rl:d.rl,tk:n(o.tk,1,3,d.tk),hl:on(o.hl,d.hl),
    idol:d.idol,hn:on(o.hn,d.hn),hm:on(o.hm,d.hm),hs:on(o.hs,d.hs),gems:n(o.gems,0,2,d.gems),ga:on(o.ga,d.ga),hr:on(o.hr,d.hr),st:n(o.st,0,2,d.st),band:n(o.band,0,3,d.band),pre:typeof o.pre==="string"?o.pre.slice(0,24):d.pre,arch:{},keep:{}};
  EZ_ARCH.forEach(a=>{s.arch[a.k]=o.arch&&o.arch[a.k]?1:0;});
  if(o.arch&&o.arch.elem){s.arch.fire=s.arch.cold=s.arch.light=1;} /* older saves had one Elemental pick */
  if(o.arch&&o.arch.dot){s.arch.pois=s.arch.bleed=s.arch.ign=1;} /* ... and one Damage over time pick */
  if(o.arch&&o.arch.def){s.arch.armour=s.arch.evasion=s.arch.es=1;} /* ... and one Defences pick */
  if(o.idol==="orbit")s.arch.orbit=1; /* older saves had "only orbiting" as an Idol mode */
  ["core","runes","tsw"].forEach(k=>{s.keep[k]=on(o.keep&&o.keep[k],d.keep[k]);});
  return s;
}
/* lines the game data knows, one per distinct text (same text = same line) */
function ezLines(ids,only){
  const seen=new Set(),out=[];
  ids.forEach(id=>{const t=LINEN[id];if(!t||!EZ_LINEIDS.has(id)||seen.has(t))return;if(only&&!only(id,t))return;seen.add(t);out.push(id);});
  return out;
}
/* the gear lines one pick really contributes, given all picks: an element pick drops its style-bound lines of a style that was not picked; Attacks / Spells bring their style-bound element lines only while no element is picked */
function ezEff(a,s){
  const S=[];if(s.arch.spell)S.push("spell");if(EZ_ATK.some(k=>s.arch[k]))S.push("attack");
  if(a.el)return a.ids.filter(id=>!EZ_ST[id]||!S.length||S.includes(EZ_ST[id]));
  if((a.k==="attack"||a.k==="spell")&&!EZ_ARCH.some(x=>x.el&&s.arch[x.k]))return a.ids.concat(EZ_ARCH.filter(x=>x.el).flatMap(x=>x.ids.filter(id=>EZ_ST[id]===a.k)));
  return a.ids;
}
const ezGearIds=(a,s)=>ezLines(ezEff(a,s));
const ezIdolIds=(a,s)=>ezLines(ezEff(a,s).concat(a.idol),(id,t)=>a.idol.includes(id)||EZ_IDOLTXT.has(t));
/* tier limit t for one gear line at Rupture Level rl: for each affix with this text, the best tier whose item level is <= rl, plus (keep-1) tiers; the loosest affix decides. 0 = no limit. */
function ezTP(ids){const parts=[];[ids.filter(x=>x.t!==99),ids.filter(x=>x.t===99)].forEach(g=>{for(let i=0;i<g.length;i+=MAXL.a){const c=g.slice(i,i+MAXL.a),m=Math.max(...c.map(x=>x.t));parts.push({p:c.map(x=>x.id),t:m===99?0:m});}});
  /* an unlimited line that has no more tiers than a limited rule's limit loses nothing there (a limit of T4 on a 4-tier line hides nothing), so it joins that rule instead of getting its own */
  const free=ids.filter(x=>x.t===99);
  free.forEach(x=>{if(!x.top)return;const host=parts.find(q=>q.t&&q.t>=x.top&&q.p.length<MAXL.a&&!q.own);if(!host)return;const own=parts.find(q=>!q.t&&q.p.includes(x.id));if(!own)return;own.p.splice(own.p.indexOf(x.id),1);host.p.push(x.id);});
  return parts.filter(q=>q.p.length);}
const ezTop=id=>{const t=LINEN[id];let top=0;AFF.forEach(a=>{if(!/^idol/i.test(a.id)&&LINEN[a.id]===t)top=Math.max(top,a.n);});return top;}; /* most tiers any gear affix of this line has (0 = unknown) */ /* lines without a known tier limit get their own rules, so they never lift the limit of the other lines */
function ezThr(id,rl,keep){
  if(!rl)return 0;const t=LINEN[id];let thr=0,top=0;
  AFF.forEach(a=>{if(/^idol/i.test(a.id)||LINEN[a.id]!==t)return; /* Idol affixes (also the idol_grand_* ones) never drop on gear, so they must not loosen a gear rule */
   top=Math.max(top,a.n);
    let kb=0;for(let k=1;k<=a.n;k++)if(tierLvl(a,k)<=rl){kb=k;break;}
    if(kb)thr=Math.max(thr,kb+keep-1);});
  if(thr&&top===1)return 1; /* a one-tier line is always T1, so it must not lift the limit of the rule it sits in */
  return thr&&thr<Math.min(top,EZ_TMAX)?thr:0;
}
const ezChunks=ids=>{const p=[];for(let i=0;i<ids.length;i+=MAXL.a)p.push(ids.slice(i,i+MAXL.a));return p;};
function easyGen(s,pack,merge){
  s=ezSane(s);
  const notes=[],R=[];
  const band=s.pre==="leveling"?EZ_BANDS[s.band]:null; /* Leveling level band: the tier cap comes from the band's lower limit, 2 tiers kept */
  const rl=band&&band.rl?band.rl:s.rl;if(band&&band.rl)s=Object.assign({},s,{tk:2});
  const mk=(o,name,fn)=>{const r=newRule(o);r.name=name.slice(0,NAME_MAX);if(fn)fn(r);R.push(r);return r;};
  const act=EZ_ARCH.filter(a=>s.arch[a.k]);
  act.forEach(a=>{[a.ids,a.idol].forEach(l=>l.forEach(id=>{if(!EZ_LINEIDS.has(id)||!LINEN[id])notes.push("Line "+id+" is not in the game data of this page and was skipped.");}));});
  /* a line that two picks share (crit, for example) is listed once, under the first pick that has it, so it never wastes an a= slot or a rule */
  const own=()=>{const seen=new Set();return id=>{const t=LINEN[id];if(seen.has(t))return false;seen.add(t);return true;};};
  const og=own(),oi=own();
  /* Rupture Level -> tier: per line, the best tier that can drop at that level (tier item levels from the game data) plus how many tiers to keep. Lines are sorted by limit and grouped 6 per rule. */
  const gearA=act.map(a=>{const ids=ezGearIds(a,s).filter(og).map(id=>({id,t:ezThr(id,rl,s.tk)||99,top:ezTop(id)})).sort((x,y)=>x.t-y.t);
    const parts=pack?[]:ezTP(ids); /* same rule count as without a tier limit: sorted by limit, up to 6 per rule, the loosest line of a rule sets its limit */
    return{a,parts,ids};}).filter(x=>x.ids.length);
  let idolA=act.map(a=>({a,parts:ezChunks(ezIdolIds(a,s).filter(oi))})).filter(x=>x.parts.length);
  let gearP=gearA;
  /* too many rules: one shared list for all picks (up to 6 lines per rule across picks, one colour). The caller falls back to this only when the normal build is over the limit. */
  if(pack){
    const gi=gearA.flatMap(x=>x.ids),ii=idolA.flatMap(x=>x.parts.flat());
    const col=act[0]?act[0].col:6;
    gearP=gi.length?[{a:{n:"Gear picks",col},parts:ezTP(gi.slice().sort((x,y)=>x.t-y.t))}]:[];
    idolA=ii.length?[{a:{n:"Idol picks",col},parts:ezChunks(ii)}]:[];
  }
  /* picks with the same colour share rules (any-of lines with the same action, colour and tier limit behave exactly like one rule), so 6 lines fill a rule even across picks */
  /* each pick keeps its own rules by default; picks of the same colour share rules only when the separate build would pass the rule limit (merge), and everything shares one list as the last step (pack) */
  if(!pack&&merge){
    const byCol=(list,get)=>{const m=new Map();list.forEach(x=>{const c=x.a.col;if(!m.has(c))m.set(c,{n:[],col:c,ids:[]});const g=m.get(c);g.n.push(x.a.n);g.ids.push(...get(x));});return[...m.values()];};
    gearP=byCol(gearA,x=>x.ids).map(g=>({a:{n:g.n.length>3?"Picks":g.n.join(" + "),col:g.col},parts:ezTP(g.ids.slice().sort((x,y)=>x.t-y.t))}));
    idolA=byCol(idolA,x=>x.parts.flat()).map(g=>({a:{n:g.n.length>3?"Picks":g.n.join(" + "),col:g.col},parts:ezChunks(g.ids)}));
  }
  const rarHide=(s.hn||s.hm)?1:0;
  const white=gearA.length>0;
  const idolWhite=s.idol==="match"&&idolA.length>0;
  let why=white?(gearA.length?"Gear picks are on, so matching gear is kept and the rest of the gear is hidden.":""):"Only a few things are hidden, so everything else stays shown.";
  const idolWhy=s.idol==="none"?" All Idols are hidden.":idolWhite?" Idols without your picked lines are hidden.":s.idol==="all"?" All Idols stay shown.":" Idols are not touched.";
  why+=idolWhy;
  if(act.length)why+=s.hm?" Match rules use Rarity Rare, because Magic is hidden.":" Match rules use any Rarity, because Magic is not hidden.";
  const anyHide=white||rarHide;
  /* 1 specials: the game's own End Game preset rules (kept above every hide so they are never caught) */
  if(s.keep.core)mk({type:13,action:3,colour:0},"Core-touched");
  if(s.keep.runes&&anyHide)mk({type:4,rarity:1,action:1},"Rune bases");
  if(s.keep.tsw&&anyHide)mk({type:16,rarity:3,level:6,action:2,colour:0},"Truesworn bases");
  if(s.gems)mk({type:17,action:s.gems===2?4:0},s.gems===2?"Sell gems":"Hide gems"); /* a Gems rule only catches gems, so its place in the list does not matter */
  if(s.hr)mk({type:33,rarity:3,action:0},"Hide Normal and Magic Dwarven Runes"); /* Sell does not work on Dwarven Runes (in game, 25.11.2026), so Hide; it costs Dwarven Carving material. A rune rule only catches runes, so its place does not matter */
  /* 2 Idols: Type 0 does not cover Idols, so they get their own rules. Picks come first, the hide of the other Idols after them. */
  if(s.idol!=="none"&&(s.idol==="match"||s.hl))idolA.forEach(x=>x.parts.forEach((p,i)=>mk({type:14,rarity:0,action:s.hl?2:1,colour:x.a.col},"Idols: "+x.a.n+(x.parts.length>1?" "+(i+1)+"/"+x.parts.length:""),r=>msetList(r,"a",p))));
  if(s.idol==="none"){mk({type:14,action:0},"Idols");if(act.some(a=>!a.ids.length))notes.push("Idol-only picks do nothing while all Idols are hidden.");}
  else if(idolWhite)mk({type:14,action:0},"Other idols");
  else if(s.idol==="all"&&!s.hl&&idolA.length)notes.push("Idols stay shown and Highlight is off, so Idol picks change nothing. Turn Highlight on or use Match my picks.");
  else if(s.idol==="match"&&act.length&&!idolA.length)notes.push("None of your picks has Idol lines, so Idols are not touched.");
  /* 3 hide normal / magic gear. With gear picks it comes after them (so shown Magic matches are never caught) and before the catch-all.
        Without picks it must come before the level-floor show rule, or Normal and Magic gear above the floor would be shown first. */
  const hideR=()=>{if(rarHide){const w=s.hn&&s.hm?"Normal and magic gear":s.hn?"Normal gear":"Magic gear";mk({type:0,rarity:s.hn&&s.hm?3:s.hn?1:2,action:s.hs?4:0},s.hs?"Sell "+w[0].toLowerCase()+w.slice(1):w);}};
  const ga=()=>{if(s.ga)gaRules().forEach(r=>R.push(r));};
  /* strictness extras (filters without gear picks; with picks the catch-all below already hides every other Rare). Always an explicit Rare rarity, never Any. */
  const stTop=()=>{if(s.st===2)mk({type:0,rarity:4,level:7,quality:2,action:s.hl?3:1,colour:4},"Keep top-roll Rares (item level 82+)");}; /* a tier highlight: it sits above the Ashen block */
  const stHide=()=>{
    if(s.st===1)mk({type:0,rarity:4,level:4,action:0},"Hide Rare gear under item level 75");
    if(s.st===2)mk({type:0,rarity:4,action:0},"Hide other Rare gear");
  };
  if(!gearA.length){stTop();ga();stHide();hideR();} /* the Rare Ashen / Gnome-made block sits above every Hide and Sell */
  /* 4 gear picks and the level floor */
  if(white){
    gearP.forEach(x=>x.parts.forEach((q,i)=>mk({type:0,rarity:s.hm?4:0,action:s.hl?2:1,colour:x.a.col},x.a.n+(x.parts.length>1?" "+(i+1)+"/"+x.parts.length:""),r=>{if(q.t)mset(r,"t",String(q.t));msetList(r,"a",q.p);})));
    if(gearA.length){ga();hideR();} /* below the tier highlights of the picks, above the hides */
    /* the catch-all hide never uses Any rarity: it is written per rarity. Normal and Magic that the hide above did not take, then Rare. */
    if(s.hn&&s.hm)mk({type:0,rarity:4,action:0},"Everything else"); /* Normal and Magic are already hidden above, so only Rares are left to hide */
    else{const rest=s.hn?2:s.hm?1:3;mk({type:0,rarity:rest,action:0},"Everything else: "+(rest===3?"Normal and magic":rest===1?"Normal":"Magic")+" gear");mk({type:0,rarity:4,action:0},"Everything else: Rare gear");}
  }
  if(act.length&&!gearA.length&&!white&&act.every(a=>!a.ids.length))notes.push("Your picks are Idol-only, so gear is not touched.");
  if(!pack&&R.length>EASY_PACK_LIMIT&&act.length){
    const g=merge?easyGen(s,true):easyGen(s,false,true);
    if(g.rules.length<R.length){g.notes.push(merge?"Too many rules for Easy Mode ("+EASY_PACK_LIMIT+"), so the picks share rules and one colour: "+R.length+" rules became "+g.rules.length+".":"Too many separate rules for Easy Mode ("+EASY_PACK_LIMIT+"), so picks of the same colour share rules: "+R.length+" rules became "+g.rules.length+".");return g;}
  }
  return{rules:R,mode:white?"white":"black",why,notes};
}
/* ---- state, hash and storage ---- */
function ezHash(str){let h=0x811c9dc5;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16);}
const ezHashF=f=>ezHash(encode(f).replace(/^BOFILTER:1,[^|]*/,""));
function ezLoad(){let o=null;try{o=JSON.parse(localStorage.getItem(EZ_KEY)||"null");}catch(e){}
  return{s:ezSane(o&&o.s),h:o&&typeof o.h==="string"?o.h:"",m:o&&o.m==="easy"?"easy":"adv",r:o&&o.r===1?1:0};}
var EZ=ezLoad();
function ezSave(){try{localStorage.setItem(EZ_KEY,JSON.stringify({s:EZ.s,h:EZ.h,m:EZ.m,r:EZ.r?1:0}));}catch(e){}}
const ezSnap=()=>EZ?{s:EZ.s,h:EZ.h}:null;
function ezRestore(f){if(f&&f.e&&f.e.s){EZ.s=ezSane(f.e.s);EZ.h=typeof f.e.h==="string"?f.e.h:"";ezSave();}if(f)delete f.e;}
const ezLinked=()=>!!EZ.h&&EZ.h===ezHashF(F);
/* ---- state label: preset name, "+ builds" chip, Custom ----
   A preset owns the hides, the tier limits, the level, the rule order and the Ashen block. The build buttons (arch) only add lines to keep, so they never change the label; they show as a "+ builds" chip.
   Changing anything the preset owns, or editing the filter outside Easy Mode, makes the state Custom. The presets are defined in EZ_PRESETS (id -> {name, short, vals}): Leveling, Endgame and Uber Strict. */
const EZ_PRESETS={
  leveling:{name:"Leveling",short:"Shows basic gear, early bases, and progression items while leveling up.",vals:{rl:0,tk:3,hl:1,idol:"match",hn:0,hm:0,hs:0,gems:0,ga:1,hr:0,st:0}},
  endgame:{name:"Endgame",short:"Hides low-tier items; highlights optimal endgame bases and essential affixes.",vals:{rl:75,tk:2,hl:1,idol:"match",hn:1,hm:1,hs:0,gems:0,ga:1,hr:0,st:1}},
  uber:{name:"Uber Strict",short:"Hides almost everything except absolute best-in-slot bases and top tier rolls.",vals:{rl:84,tk:1,hl:1,idol:"match",hn:1,hm:1,hs:0,gems:0,ga:1,hr:1,st:2}}
};
const EZ_PRE_IDS=Object.keys(EZ_PRESETS);
/* Leveling level bands: pill label, tier-cap level (the band's LOWER limit, so the best droppable tier at the start of the band stays). Any and 1-31 add no cap (T8 is still droppable). Not in EZ_OWNED: a band never makes the state Custom. */
const EZ_BANDS=[{label:"Any",rl:0},{label:"1–31",rl:0},{label:"32–55",rl:32},{label:"56–74",rl:56}];
const EZ_OWNED=["rl","tk","hl","idol","hn","hm","hs","gems","ga","hr","st"];
/* the state after choosing a preset: everything the preset owns is reset, the build picks stay */
const ezPreset=(id,s)=>ezSane(Object.assign({},s,EZ_PRESETS[id].vals,{keep:{core:1,runes:1,tsw:1},band:0,pre:id,arch:s.arch}));
const ezOwnedChanged=(a,b)=>EZ_OWNED.some(k=>a[k]!==b[k])||["core","runes","tsw"].some(k=>a.keep[k]!==b.keep[k]);
function ezBadge(s,linked,hasHash){
  const builds=EZ_ARCH.filter(a=>s.arch[a.k]).length;
  if(hasHash&&!linked)return{label:"Custom",custom:true,builds:0,chip:""};
  if(!s.pre)return null;
  const p=EZ_PRESETS[s.pre];
  if(!p)return{label:"Custom",custom:true,builds:0,chip:""};
  return{label:p.name,custom:false,builds,chip:builds?"+ builds":""};
}
const NAME_MAX=40;

/* module boundary: imported bindings are read-only, so the shared mutable state is changed through these setters */
export function setF(v){F=v;return v;}
export function bumpRev(){return ++REV;}
export function setLangId(v){LANG=v;return v;}
export function setDcRev(v){DC_REV=v;return v;}
export {idolLineId,EZ_EXCLUDED,REDLAB,DATA_BUILD,fixAn,defOf,MAXL,DATA,RAW_LINE,COND_LINE,cleanLineText,COLL,sortKey,byText,LINE_IDS,LINE_HAY,BASEN,REDN,LINEN,RED_IDS,LANGS,LX,DC_REV,LANG,dl,BASED,REDD,LINED,dItemName,PRIMAL_IDS,redIdOf,MAX_RULES,COPY,T,COLOURS,FIELDS,NEW_RULE,ALPHA,alphaKeep,nameOf,colOf,uid,newRule,MORE_ORDER,parseMore,moreStr,mval,mset,mrng,msetRng,mlist,msetList,hasRaw,ruleClash,anOnBasesOrReds,GA_COLOUR,GA_GM,GA_ASH,GA_IDS,gaRules,isGaRule,rulesIssues,encode,decode,LINEMAP,LEVEL,RAR,typeMatch,rollOk,moreMatch,matches,NEVER_HIDDEN,SIM,simRules,evaluate,REV,evalC,ARM,ARM_N,ARM_L,BASE_SRC,BASES,BASE_BY_ID,addBase,VAR_SRC,VARIANTS,VAR_IDS,SPECIAL,CHASE,AFF_SRC,AFF,IDOL_G,IDOL_LV,UNIQUE_SRC,UNIQUE_EXTRA,UNIQUES,rnd,pick,wpick,CATKEYS,MISC,tierLvl,tierPick,rollMods,CLASSES,genItem,USER_CODE,GAME_PRESETS,PRESETS,F,LVSTEPS,rngText,EZ_KEY,EZ_ARCH,EZ_ST,EZ_ATK,EZ_GRP,EZ_RL,EZ_KEEP,EZ_TMAX,EZ_LINEIDS,EZ_IDOLTXT,ezDef,ezSane,ezLines,ezEff,ezGearIds,ezIdolIds,ezTP,ezThr,ezChunks,easyGen,ezHash,ezHashF,ezLoad,EZ,ezSave,ezSnap,ezRestore,ezLinked,EZ_PRESETS,EZ_PRE_IDS,ezPreset,EZ_BANDS,EZ_OWNED,ezOwnedChanged,ezBadge,NAME_MAX};
