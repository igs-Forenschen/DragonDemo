const DRAGON_PERF = {
  balls: {
    small: {
      shots:   [2, 3, 4, 5],
      shots_w: [25, 10, 8, 3],
      muls:    [20, 30, 40],
      muls_w:  [35, 20, 10],
      radius:  28
    },
    big: {
      shots:   [1, 2, 3],
      shots_w: [25, 15, 5],
      muls:    [60, 80, 100],
      muls_w:  [50, 40, 20],
      radius:  46
    }
  },

  // ── 全域時間軸（單位：ms）──────────────────────────
  timing: {
    accel_dur:        1500,
    decel_dur:        1000,
    charge_dur_small:  200,
    charge_dur_big:    400,
    burst_dur:         400,
    ball_interval:     300,
    wave_pause_dur:    900
  },

  // ── 波次腳本 ────────────────────────────────────────
  // key = 本局總球數（smallCount + bigCount）
  //
  // 欄位說明：
  //   w             : 權重（同 key 內相對比例）
  //   waves         : 每波球槽數量，總和必須等於總球數
  //   bigPos        : 'last_in_wave' | 'last_of_all' | 'custom'
  //   req_big       : [選填] 限定大球數量才抽到此腳本；
  //                   bigPos:'custom' 一定要填；'last_of_all'/'last_in_wave' 可省略
  //   custom_pauses : [選填] 各波之間的停頓 ms，長度 = waves.length - 1
  //   custom_big_idx: [bigPos:'custom' 時必填] 大球在展平序列的索引，數量必須 = req_big
  //
  // 大球數量對應規則（小球數 + 大球數 = 總球數）：
  //   Total 3 → 大球只能是 1（2小+1大）
  //   Total 4 → 大球 1（3小+1大）或 2（2小+2大）
  //   Total 5 → 大球 1（4小+1大）、2（3小+2大）或 3（2小+3大）
  //   Total 6 → 大球 1（5小+1大）、2（4小+2大）或 3（3小+3大）
  //   Total 7 → 大球 2（5小+2大）或 3（4小+3大）
  //   Total 8 → 大球只能是 3（5小+3大）
  scripts: {

    // ──────────────────────────────────────────────────
    // 【Total 3】大球只能是 1，兩腳本都適用
    // ──────────────────────────────────────────────────
    3: [
      // 3-A：標準尾刀 [小, 小, 大]
      { w: 50, waves: [3], bigPos: 'last_in_wave' },
      // 3-B：起手突襲 [大] → 停頓 1.5s → [小, 小]
      { w: 50, waves: [1, 2], bigPos: 'custom', req_big: 1, custom_pauses: [1500], custom_big_idx: [0] }
    ],

    // ──────────────────────────────────────────────────
    // 【Total 4】大球可能是 1 或 2
    // ──────────────────────────────────────────────────
    4: [
      // ▸ 大球 = 1（3小+1大）
      // 4-A1：標準假死 [小,小] → 1.2s → [小,大]
      { w: 40, waves: [2, 2], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1200] },
      // 4-B1：藏在中間 [小] → [小,大] → [小]
      { w: 30, waves: [1, 2, 1], bigPos: 'custom', req_big: 1, custom_pauses: [400, 400], custom_big_idx: [2] },
      // 4-C1：起手突襲 [大,小] → 0.8s → [小,小]
      { w: 30, waves: [2, 2], bigPos: 'custom', req_big: 1, custom_pauses: [800], custom_big_idx: [0] },

      // ▸ 大球 = 2（2小+2大）
      // 4-A2：頭尾包夾 [大,小] → 0.8s → [小,大]
      { w: 50, waves: [2, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 3] },
      // 4-B2：連續爆發 [小] → 1.5s → [大,大,小]
      { w: 50, waves: [1, 3], bigPos: 'custom', req_big: 2, custom_pauses: [1500], custom_big_idx: [1, 2] }
    ],

    // ──────────────────────────────────────────────────
    // 【Total 5】大球可能是 1、2 或 3
    // ──────────────────────────────────────────────────
    5: [
      // ▸ 大球 = 1（4小+1大）—— 尾刀壓軸
      { w: 50, waves: [2, 3], bigPos: 'last_of_all', req_big: 1, custom_pauses: [600] },
      { w: 50, waves: [3, 2], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1200] },

      // ▸ 大球 = 2（3小+2大）
      // 5-A2：經典漸強 [小,小] → [小,大,大]
      { w: 40, waves: [2, 3], bigPos: 'last_of_all', req_big: 2, custom_pauses: [600] },
      // 5-B2：頭尾呼應 [大,小,小] → [小,大]
      { w: 30, waves: [3, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 4] },
      // 5-C2：中段連爆 [小,大] → [大] → [小,小]
      { w: 30, waves: [2, 1, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800, 400], custom_big_idx: [1, 2] },

      // ▸ 大球 = 3（2小+3大）—— 幾乎全是大球，極稀有
      // 5-A3：大球連炸壓尾 [小,小] → [大,大,大]
      { w: 50, waves: [2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [1500], custom_big_idx: [2, 3, 4] },
      // 5-B3：大球夾擊 [大,小] → [大,大]
      { w: 50, waves: [2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [600], custom_big_idx: [0, 2, 3] }
    ],

    // ──────────────────────────────────────────────────
    // 【Total 6】大球可能是 1、2 或 3
    // ──────────────────────────────────────────────────
    6: [
      // ▸ 大球 = 1（5小+1大）—— 稀少，給基本尾刀
      { w: 60, waves: [3, 3], bigPos: 'last_of_all', req_big: 1, custom_pauses: [900] },
      { w: 40, waves: [2, 4], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1500] },

      // ▸ 大球 = 2（4小+2大）
      // 6-A2：頭尾包夾 [大,小,小] → [小,小,大]
      { w: 40, waves: [3, 3], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 5] },
      // 6-B2：中段連爆 [小,小] → [大,大] → [小,小]
      { w: 30, waves: [2, 2, 2], bigPos: 'custom', req_big: 2, custom_pauses: [600, 600], custom_big_idx: [2, 3] },
      // 6-C2：假死壓尾 [小,小,小] → 1.2s → [小,大,大]
      { w: 30, waves: [3, 3], bigPos: 'last_of_all', req_big: 2, custom_pauses: [1200] },

      // ▸ 大球 = 3（3小+3大）
      // 6-A3：交錯連發 [大,小] [大,小] [大,小]
      { w: 40, waves: [2, 2, 2], bigPos: 'custom', req_big: 3, custom_pauses: [300, 300], custom_big_idx: [0, 2, 4] },
      // 6-B3：中段集中 [小] [大,大,大] [小,小]
      { w: 30, waves: [1, 3, 2], bigPos: 'custom', req_big: 3, custom_pauses: [600, 600], custom_big_idx: [1, 2, 3] },
      // 6-C3：傳統高潮 [小,小,小] → 1.2s → [大,大,大]
      { w: 30, waves: [3, 3], bigPos: 'custom', req_big: 3, custom_pauses: [1200], custom_big_idx: [3, 4, 5] }
    ],

    // ──────────────────────────────────────────────────
    // 【Total 7】大球可能是 2 或 3
    // ──────────────────────────────────────────────────
    7: [
      // ▸ 大球 = 2（5小+2大）
      // 7-A2：假死壓尾 [小,小,小] → 1.5s → [小,小,大,大]
      { w: 50, waves: [3, 4], bigPos: 'last_of_all', req_big: 2, custom_pauses: [1500] },
      // 7-B2：頭尾包夾 [大,小,小] → [小,小,小,大]
      { w: 50, waves: [3, 4], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 6] },

      // ▸ 大球 = 3（4小+3大）
      // 7-A3：三明治夾擊 [小,大] [小,大,小] [大,小]
      { w: 40, waves: [2, 3, 2], bigPos: 'custom', req_big: 3, custom_pauses: [400, 400], custom_big_idx: [1, 3, 5] },
      // 7-B3：開局三連爆 [大,大,大] → 0.8s → [小,小,小,小]
      { w: 30, waves: [3, 4], bigPos: 'custom', req_big: 3, custom_pauses: [800], custom_big_idx: [0, 1, 2] },
      // 7-C3：壓軸爆發 [小,小] → [小,小] → 1.5s → [大,大,大]
      { w: 30, waves: [2, 2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [600, 1500], custom_big_idx: [4, 5, 6] }
    ],

    // ──────────────────────────────────────────────────
    // 【Total 8】大球只能是 3（5小+3大）
    // ──────────────────────────────────────────────────
    8: [
      // 8-A：規律穿插 [小,大] [小,大] [小,大] [小,小]
      { w: 40, waves: [2, 2, 2, 2], bigPos: 'custom', req_big: 3, custom_pauses: [300, 300, 300], custom_big_idx: [1, 3, 5] },
      // 8-B：核心夾心 [大,小] [小,大,大,小] [小,小]
      { w: 30, waves: [2, 4, 2], bigPos: 'custom', req_big: 3, custom_pauses: [400, 400], custom_big_idx: [0, 3, 4] },
      // 8-C：終極憋氣 [小,小,小] → 2s → [大,大,大,小,小]
      { w: 30, waves: [3, 5], bigPos: 'custom', req_big: 3, custom_pauses: [2000], custom_big_idx: [3, 4, 5] }
    ]
  }
};
