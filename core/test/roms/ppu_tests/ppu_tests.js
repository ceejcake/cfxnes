//=============================================================================
// Test:   ppu_tests
// Source: http://www.slack.net/~ant/nes-tests/blargg_ppu_tests.zip
//=============================================================================

import { BufferedOutputPPU } from '../units';

export const dir = './test/roms/ppu_tests';

export const files = [
  'palette_ram.nes',
  'power_up_palette.nes',
  'sprite_ram.nes',
  'vbl_clear_time.nes',
  'vram_access.nes',
];

export function configure(config) {
  config.ppu = {class: BufferedOutputPPU};
}

export function execute(test) {
  test.step(test.number === 3 ? 230000 : 180000);
  test.screenshot('ppu_tests.png');
}
