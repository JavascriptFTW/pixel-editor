var ColorPicker = (function() {
    
    var React = require("react");
    var CanvasStore = require("../Stores/CanvasStore.js");
    var CanvasDispatcher = require("../Dispatcher/CanvasDispatcher.js");
    var FancySlider = require("./FancySlider.jsx");
    var constants = require("../Constants.js");
    
    function toBrushVal(c) {
        let r = c.slice(1, 3),
            g = c.slice(3, 5),
            b = c.slice(5, 7);
        return [r, g, b].map(val => parseInt(val, 16));
    }
    
    ColorPicker = React.createClass({
        getDefaultProps() {
            return {
                onChange() {}
            };
        },
        getInitialState() {
            return {
                hue: 270,
                saturation: 100,
                lightness: 50,
                alpha: 1.0
            };
        },
        render() {
            return <div style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 250,
                height: 200
            }}>
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: "80%",
                    backgroundColor: `hsla(${this.state.hue}, 100%, 50%, 1.0)`
                }}></div>
                <FancySlider minX={0} maxX={100} onChange={this.handleSLChange}
                    minY={0} maxY={100} valueX={this.state.saturation}
                    valueY={100 - (this.state.lightness /
                        (1 - this.state.saturation / 200))}
                    knobStyle={{
                        position: "absolute",
                        top: -7,
                        left: -7,
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: "3px solid #f8f8f8",
                        zIndex: "10",
                        backgroundColor: `hsla(${this.state.hue},` +
                            `${this.state.saturation}%,` +
                            `${this.state.lightness}%, 1.0)`
                    }} trackStyle={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: "80%",
                        background: "url(Resources/ColorPickerOverlay.png) no-repeat"
                    }}/>
                <FancySlider minY={0} maxY={360}
                    valueY={360 - this.state.hue} onChange={this.handleHueChange}
                    knobStyle={{
                        position: "absolute",
                        top: -15,
                        width: 40,
                        height: 10,
                        borderRadius: "10%",
                        border: "5px solid #f8f8f8",
                        backgroundColor: `hsla(${this.state.hue}, 100%, 50%, 1.0)`
                    }} trackStyle={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: "20%",
                        background: "url(Resources/ColorPickerTrack.png) no-repeat"
                    }}/>
            </div>
        },
        handleHueChange(val) {
            this.setState({
                hue: 360 - val.y
            });
        },
        handleSLChange(val) {
            let saturation = val.x;
            let lightness = (100 - val.y) * (1 - val.x / 200);
            if (lightness === 0) {
                saturation = 0;
            }
            this.setState({
                saturation: saturation,
                lightness: lightness
            });
        },
        handleDragEnd() {
            this.props.onChange({
                hue: this.state.hue,
                saturation: this.state.saturation,
                lightness: this.state.lightness,
                alpha: this.state.alpha
            });
        }
    });
    
    module.exports = ColorPicker;
    return ColorPicker;
    
})();
