# Input API

**Note: This documentation is for the upcoming version 0.5.0**

- [Devices](#user-content-devices)
- [Sources](#user-content-sources)
- [Options](#user-content-options)
- [Methods](#user-content-methods)
- [Inputs](#user-content-inputs)

## Devices

CFxNES is currently able to emulate the following NES controllers:
- `'joypad'` - Joypad (standard NES controller)
- `'zapper'` - Zapper (beam gun)

We refer to them as *virtual input devices* (or just *devices*). Each type of device can be connected to *port* #1 or #2 using the [setInputDevice()](#user-content-setinputdeviceport-device) method. Empty port is represented by `null` value.

Input of any device can be expressed as a string `'<port>.<device>.<name>'`:
- `<port>` - the port number
- `<device>` - the device
- `<name>` - name of the input

*Examples:*

- `'1.joypad.start'` - Start button of a joypad connected to the port #1.
- `'2.zapper.trigger'` - Trigger button of a zapper connected to the port #2.

## Sources

Source refers to a *real input device* that is used to emulate one ore more *virtual input devices*.
- `'keyboard'` - Keyboard
- `'mouse'` - Mouse
- `'gamepad'` - Gamepad

The value `'gamepad'` means *any connected gamepad*. Use `'gamepadN'` (where *N* is a [gamepad index](https://w3c.github.io/gamepad/#gamepad-interface))  to address a specific gamepad (`'gamepad0'`, `'gamepad1'`, etc.).

Input of any source can be expressed as a string `'<source>.<name>'`:
- `<source>` - the source
- `<name>` - name of the input

*Examples:*

- `'keyboard.ctrl'` - Ctrl key.
- `'mouse.left'` - Left mouse button.
- `'gamepad.x'` - X button of any gamepad.
- `'gamepad0'.start` - Start button of gamepad #0.

One or more *source inputs* can be mapped to *device input* using the [mapInputs()](#user-content-mapinputsdeviceinput-sourceinputs) method.

## Options

| Name | Type | Default | Description |
|------|------|----------|-------------|
| inputDevices | `Array` | See example bellow | Devices connected to ports #1 and #2. |
| inputMapping | `object` | See example bellow | Mapping between source and device inputs. |

*Example:*

```` javascript
new CFxNES({
  inputDevices: ['joypad', 'zapper'], // Devices connected to ports #1 and #2.
  inputMapping: {
    '1.joypad.a': 'keyboard.x', // 'X' key will emulate 'A' button of a joypad on port #1
    '1.joypad.b': ['keyboard.y', 'keyboard.z'], // Multiple source inputs
    '1.joypad.start': 'keyboard.enter',
    '1.joypad.select': 'keyboard.shift',
    '1.joypad.up': 'keyboard.up',
    '1.joypad.down': 'keyboard.down',
    '1.joypad.left': 'keyboard.left',
    '1.joypad.right': 'keyboard.right',
    '2.zapper.trigger': 'mouse.left'
  }
});
````

## Methods

#### .setInputDevice(port, device)

Sets device connected to the specified port.

- **port**: `number` - the port number (`1` or `2`)
- **device**: `string` - the device; `null` to make the port empty

#### .getInputDevice(port)

Returns device that is currently connected to the specified port.

- **port**: `number` - the port number (`1` or `2`)
- **returns**: `string` - the device;`null` if the port is empty

#### .mapInputs(deviceInput, sourceInputs)

Creates mapping between *device input* and one or more *source inputs*.

- **deviceInput**: `string` - the device input
- **sourceInputs**: `string` | `Array` - the source input or array of source inputs

*Example:*

```` javascript
cfxnes.mapInput('1.joypad.a', 'keyboard.y');
cfxnes.mapInput('1.joypad.a', 'keyboard.z');
// Can be simplified to one call
cfxnes.mapInput('1.joypad.a', ['keyboard.y', 'keyboard.z']);
````

#### .unmapInputs(...inputs)

Removes mapping for the specified *device* or *source inputs*.

- **inputs**: `...string` - one or more inputs; omit to remove mapping for all inputs

*Example:*

```` javascript
cfxnes.mapInputs('1.joypad.a', ['keyboard.y', 'keyboard.z']);
cfxnes.unmapInputs('keyboard.z');
// Has the same effect as calling only
cfxnes.mapInputs('1.joypad.a', 'keyboard.y');
````

#### .getMappedInputs(input)

Returns *device* or *source inputs* mapped to their counterpart.

- **deviceInput**: `string` - the input
- **returns**: `Array` - array of mapped inputs

*Example:*

```` javascript
cfxnes.mapInput('1.joypad.a', ['keyboard.y', 'keyboard.z']);
cfxnes.getMappedInputs('1.joypad.a'); // Returns ['keyboard.y', 'keyboard.z']
cfxnes.getMappedInputs('keyboard.z'); // Returns ['1.joypad.a']
````


#### .recordInput(callback)

Registers a callback function that will be called when the next *source input* is received. The callback is immediately dropped after its use. Typical use of this method is to let users customize key bindings (see example below).

- **callback** - `function(sourceInput)` - the callback function that will receive the next source input

*Example:*

```` javascript
showUserMessage('Press any key..."');
cfxnes.recordInput(sourceInput => {
  hideUserMessage();
  cfxnes.mapInputs('1.joypad.a', sourceInput);
});
````

## Inputs

#### Joypad Inputs

| Input | Name |
|------|-------|
| A, B buttons | `'a'`, `'b'` |
| Start, Select buttons | `'start'`, `'select'` |
| D-pad buttons | `'left'`, `'right'`, `'up'`, `'down'` |

#### Zapper Inputs

| Input | Name |
|------|-------|
| Trigger | `'trigger'` |
| Beam position | *Cannot be mapped*. It's determined using mouse cursor position. |

#### Keyboard Inputs

| Input | Name |
|------|-------|
| Character&nbsp;keys&nbsp;(letters) | `'a'`, `'b'`, ..., `'z'` |
| Character&nbsp;keys&nbsp;(numbers) | `'0'`, `'1'`, ..., `'9'` |
| Character&nbsp;keys&nbsp;(special) | `'space'`, `','`, `'.'`, `'/'`, `';'`, `'\''`, `'\\'`, `'['`, `']'`, `'``'`, `'-'`, `'='` |
| Function keys | `'f1'`, `'f2'`, ..., `'f12'` |
| Modifier keys | `'shift'`, `'ctrl'`, `'alt'` |
| Navigation keys | `'left'`, `'up'`, `'right'`, `'down'`, `'tab'`, `'home'`, `'end'`, `'page-up'`, `'page-down'` |
| System keys | `'escape'`, `'pause'` |
| Editing keys | `'enter'`, `'backspace'`, `'insert'`, `'delete'` |
| Lock keys |  `'caps-lock'`, `'num-lock'`, `'scroll-lock'` |
| Numeric keypad |  `'numpad-0'`, `'numpad-1'`, ..., `'numpad-9'`, `'add'`, `'subtract'`, `'multiply'`, `'divide'`, `'decimal-point'` |

#### Mouse Inputs

| Input | Name |
|------|-------|
| Left, middle, right button | `'left'`, `'middle'`, `'right'` |

#### Gamepad Inputs

The set of inputs that are received from a gamepad depends on whether browser is able to recognize gamepad layout. If the gamepad is correctly recognized, the [standard layout](https://w3c.github.io/gamepad/#remapping) is used. Otherwise the *generic layout* is used as fallback.

##### Standard Gamepad Layout

![standard layout](https://upload.wikimedia.org/wikipedia/commons/2/2c/360_controller.svg)

| Input | Name |
|------|-------|
| A, B, X, Y buttons | `'a'`, `'b'`, `'x'`, `'y'` |
| Back, Start, Guide buttons | `'back'`, `'start'`, `'guide'` |
| D-pad | `'dpad-up'`, `'dpad-down'`, `'dpad-left'`, `'dpad-right'` |
| Triggers | `'left-trigger'`, `'right-trigger'` |
| Bumpers | `'left-bumper'`, `'right-bumper'` |
| Sticks (buttons) | `'left-stick'`, `'right-stick'` |
| Sticks (axes) | `'left-stick-x'`, `'left-stick-y'`, `'right-stick-x'`, `'right-stick-y'`|

To specify axis direction, `'+'` or `'-'` must be appended (e.g., `'left-stick-x-'`, `'left-stick-x+'`).

##### Generic Gamepad Layout

| Input | Name |
|------|-------|
| Buttons | `'button-0'`, `'button-1'`, ... |
| Axes | `'axis-0'`, `'axis-1'`, ... |

To specify axis direction, `'+'` or `'-'` must be appended (e.g., `'axis-0-'`, `'axis-0+'`).