"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimedSwitch = void 0;
const control_base_1 = require("./control-base");
class TimedSwitch extends control_base_1.ControlBase {
    loadAsync(type, uuid, control) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateObjectAsync(uuid, {
                type: type,
                common: {
                    name: control.name,
                    role: 'switch',
                },
                native: { control: control },
            });
            yield this.loadOtherControlStatesAsync(control.name, uuid, control.states, [
                'deactivationDelayTotal',
                'deactivationDelay',
            ]);
            yield this.createSimpleControlStateObjectAsync(control.name, uuid, control.states, 'deactivationDelayTotal', 'number', 'value.interval');
            yield this.createSimpleControlStateObjectAsync(control.name, uuid, control.states, 'deactivationDelay', 'number', 'value.interval');
            yield this.createButtonCommandStateObjectAsync(control.name, uuid, 'active', {
            // TODO: re-add: smartIgnore: type == 'channel',
            });
            this.addStateChangeListener(uuid + '.active', (oldValue, newValue) => {
                if (newValue == oldValue) {
                    return;
                }
                else if (newValue) {
                    this.sendCommand(control.uuidAction, 'on');
                }
                else {
                    this.sendCommand(control.uuidAction, 'off');
                }
            });
            yield this.createButtonCommandStateObjectAsync(control.name, uuid, 'pulse');
            this.addStateChangeListener(uuid + '.pulse', () => {
                this.sendCommand(control.uuidAction, 'pulse');
            });
        });
    }
}
exports.TimedSwitch = TimedSwitch;
//# sourceMappingURL=TimedSwitch.js.map