const DRAGON_PERF = {

  // ════════════════════════════════════════════
  // 一般版
  // ════════════════════════════════════════════
  normal: {
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

    timing: {
      accel_dur:        1500,
      decel_dur:        1000,
      charge_dur_small:  200,
      charge_dur_big:    400,
      burst_dur:         400,
      ball_interval:     300,
      wave_pause_dur:    900
    },

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
        { w: 40, waves: [2, 2], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1200] },
        { w: 30, waves: [1, 2, 1], bigPos: 'custom', req_big: 1, custom_pauses: [400, 400], custom_big_idx: [2] },
        { w: 30, waves: [2, 2], bigPos: 'custom', req_big: 1, custom_pauses: [800], custom_big_idx: [0] },

        // ▸ 大球 = 2（2小+2大）
        { w: 50, waves: [2, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 3] },
        { w: 50, waves: [1, 3], bigPos: 'custom', req_big: 2, custom_pauses: [1500], custom_big_idx: [1, 2] }
      ],

      // ──────────────────────────────────────────────────
      // 【Total 5】大球可能是 1、2 或 3
      // ──────────────────────────────────────────────────
      5: [
        // ▸ 大球 = 1
        { w: 50, waves: [2, 3], bigPos: 'last_of_all', req_big: 1, custom_pauses: [600] },
        { w: 50, waves: [3, 2], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1200] },

        // ▸ 大球 = 2
        { w: 40, waves: [2, 3], bigPos: 'last_of_all', req_big: 2, custom_pauses: [600] },
        { w: 30, waves: [3, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 4] },
        { w: 30, waves: [2, 1, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800, 400], custom_big_idx: [1, 2] },

        // ▸ 大球 = 3
        { w: 50, waves: [2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [1500], custom_big_idx: [2, 3, 4] },
        { w: 50, waves: [2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [600], custom_big_idx: [0, 2, 3] }
      ],

      // ──────────────────────────────────────────────────
      // 【Total 6】大球可能是 1、2 或 3
      // ──────────────────────────────────────────────────
      6: [
        // ▸ 大球 = 1
        { w: 60, waves: [3, 3], bigPos: 'last_of_all', req_big: 1, custom_pauses: [900] },
        { w: 40, waves: [2, 4], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1500] },

        // ▸ 大球 = 2
        { w: 40, waves: [3, 3], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 5] },
        { w: 30, waves: [2, 2, 2], bigPos: 'custom', req_big: 2, custom_pauses: [600, 600], custom_big_idx: [2, 3] },
        { w: 30, waves: [3, 3], bigPos: 'last_of_all', req_big: 2, custom_pauses: [1200] },

        // ▸ 大球 = 3
        { w: 40, waves: [2, 2, 2], bigPos: 'custom', req_big: 3, custom_pauses: [300, 300], custom_big_idx: [0, 2, 4] },
        { w: 30, waves: [1, 3, 2], bigPos: 'custom', req_big: 3, custom_pauses: [600, 600], custom_big_idx: [1, 2, 3] },
        { w: 30, waves: [3, 3], bigPos: 'custom', req_big: 3, custom_pauses: [1200], custom_big_idx: [3, 4, 5] }
      ],

      // ──────────────────────────────────────────────────
      // 【Total 7】大球可能是 2 或 3
      // ──────────────────────────────────────────────────
      7: [
        // ▸ 大球 = 2
        { w: 50, waves: [3, 4], bigPos: 'last_of_all', req_big: 2, custom_pauses: [1500] },
        { w: 50, waves: [3, 4], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 6] },

        // ▸ 大球 = 3
        { w: 40, waves: [2, 3, 2], bigPos: 'custom', req_big: 3, custom_pauses: [400, 400], custom_big_idx: [1, 3, 5] },
        { w: 30, waves: [3, 4], bigPos: 'custom', req_big: 3, custom_pauses: [800], custom_big_idx: [0, 1, 2] },
        { w: 30, waves: [2, 2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [600, 1500], custom_big_idx: [4, 5, 6] }
      ],

      // ──────────────────────────────────────────────────
      // 【Total 8】大球只能是 3（5小+3大）
      // ──────────────────────────────────────────────────
      8: [
        { w: 40, waves: [2, 2, 2, 2], bigPos: 'custom', req_big: 3, custom_pauses: [300, 300, 300], custom_big_idx: [1, 3, 5] },
        { w: 30, waves: [2, 4, 2], bigPos: 'custom', req_big: 3, custom_pauses: [400, 400], custom_big_idx: [0, 3, 4] },
        { w: 30, waves: [3, 5], bigPos: 'custom', req_big: 3, custom_pauses: [2000], custom_big_idx: [3, 4, 5] }
      ]
    }
  },

  // ════════════════════════════════════════════
  // Mega 版
  // ════════════════════════════════════════════
  mega: {
    balls: {
      small: {
        shots:   [3, 4, 5],
        shots_w: [20, 15, 8],
        muls:    [55, 77, 99, 111],
        muls_w:  [30, 22, 10, 5],
        radius:  28
      },
      big: {
        shots:   [0, 1, 2, 3],
        shots_w: [30, 25, 15, 3],
        muls:    [333, 555, 777, 1111],
        muls_w:  [48, 35, 25, 2],
        radius:  46
      }
    },

    timing: {
      accel_dur:        1500,
      decel_dur:        1000,
      charge_dur_small:  200,
      charge_dur_big:    400,
      burst_dur:         400,
      ball_interval:     300,
      wave_pause_dur:    900
    },

    scripts: {
      3: [
        { w: 50, waves: [3], bigPos: 'last_in_wave' },
        { w: 50, waves: [1, 2], bigPos: 'custom', req_big: 1, custom_pauses: [1500], custom_big_idx: [0] }
      ],
      4: [
        { w: 40, waves: [2, 2], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1200] },
        { w: 30, waves: [1, 2, 1], bigPos: 'custom', req_big: 1, custom_pauses: [400, 400], custom_big_idx: [2] },
        { w: 30, waves: [2, 2], bigPos: 'custom', req_big: 1, custom_pauses: [800], custom_big_idx: [0] },
        { w: 50, waves: [2, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 3] },
        { w: 50, waves: [1, 3], bigPos: 'custom', req_big: 2, custom_pauses: [1500], custom_big_idx: [1, 2] }
      ],
      5: [
        { w: 50, waves: [2, 3], bigPos: 'last_of_all', req_big: 1, custom_pauses: [600] },
        { w: 50, waves: [3, 2], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1200] },
        { w: 40, waves: [2, 3], bigPos: 'last_of_all', req_big: 2, custom_pauses: [600] },
        { w: 30, waves: [3, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 4] },
        { w: 30, waves: [2, 1, 2], bigPos: 'custom', req_big: 2, custom_pauses: [800, 400], custom_big_idx: [1, 2] },
        { w: 50, waves: [2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [1500], custom_big_idx: [2, 3, 4] },
        { w: 50, waves: [2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [600], custom_big_idx: [0, 2, 3] }
      ],
      6: [
        { w: 60, waves: [3, 3], bigPos: 'last_of_all', req_big: 1, custom_pauses: [900] },
        { w: 40, waves: [2, 4], bigPos: 'last_of_all', req_big: 1, custom_pauses: [1500] },
        { w: 40, waves: [3, 3], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 5] },
        { w: 30, waves: [2, 2, 2], bigPos: 'custom', req_big: 2, custom_pauses: [600, 600], custom_big_idx: [2, 3] },
        { w: 30, waves: [3, 3], bigPos: 'last_of_all', req_big: 2, custom_pauses: [1200] },
        { w: 40, waves: [2, 2, 2], bigPos: 'custom', req_big: 3, custom_pauses: [300, 300], custom_big_idx: [0, 2, 4] },
        { w: 30, waves: [1, 3, 2], bigPos: 'custom', req_big: 3, custom_pauses: [600, 600], custom_big_idx: [1, 2, 3] },
        { w: 30, waves: [3, 3], bigPos: 'custom', req_big: 3, custom_pauses: [1200], custom_big_idx: [3, 4, 5] }
      ],
      7: [
        { w: 50, waves: [3, 4], bigPos: 'last_of_all', req_big: 2, custom_pauses: [1500] },
        { w: 50, waves: [3, 4], bigPos: 'custom', req_big: 2, custom_pauses: [800], custom_big_idx: [0, 6] },
        { w: 40, waves: [2, 3, 2], bigPos: 'custom', req_big: 3, custom_pauses: [400, 400], custom_big_idx: [1, 3, 5] },
        { w: 30, waves: [3, 4], bigPos: 'custom', req_big: 3, custom_pauses: [800], custom_big_idx: [0, 1, 2] },
        { w: 30, waves: [2, 2, 3], bigPos: 'custom', req_big: 3, custom_pauses: [600, 1500], custom_big_idx: [4, 5, 6] }
      ],
      8: [
        { w: 40, waves: [2, 2, 2, 2], bigPos: 'custom', req_big: 3, custom_pauses: [300, 300, 300], custom_big_idx: [1, 3, 5] },
        { w: 30, waves: [2, 4, 2], bigPos: 'custom', req_big: 3, custom_pauses: [400, 400], custom_big_idx: [0, 3, 4] },
        { w: 30, waves: [3, 5], bigPos: 'custom', req_big: 3, custom_pauses: [2000], custom_big_idx: [3, 4, 5] }
      ]
    }
  }
};

// 向下相容：舊版 electric_dragon_demo.html 直接讀根層屬性
DRAGON_PERF.balls   = DRAGON_PERF.normal.balls;
DRAGON_PERF.timing  = DRAGON_PERF.normal.timing;
DRAGON_PERF.scripts = DRAGON_PERF.normal.scripts;
