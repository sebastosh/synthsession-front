import React, { Component } from "react";
import Tone from "tone";
import { Dial, Multislider, Piano } from "react-nexusui";
import ReactDOM from "react-dom";

export class Synth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPressed: false,
      gain: 0.4,
      octave: 3,
      name: "",
      settings: {
          vibratoAmount: 0.5,
          vibratoRate: 5,
          harmonicity: 1.5,
          voice0Volume: -10,
          voice0Portamento: 0,
          voice0OscillatorType: "sine",
          voice0FilterEnvelopeAttack: 0.01,
          voice0FilterEnvelopeDecay: 0,
          voice0FilterEnvelopeSustain: 1,
          voice0FilterEnvelopeRelease: 0.5,
          voice0EnvelopeAttack: 0.01,
          voice0EnvelopeDecay: 0,
          voice0EnvelopeSustain: 1,
          voice0EnvelopeRelease: 0.5,
          voice1Volume: -10,
          voice1Portamento: 0,
          voice1OscillatorType: "sine",
          voice1FilterEnvelopeAttack: 0.01,
          voice1FilterEnvelopeDecay: 0,
          voice1FilterEnvelopeSustain: 1,
          voice1FilterEnvelopeRelease: 0.5,
          voice1EnvelopeAttack: 0.01,
          voice1EnvelopeDecay: 0,
          voice1EnvelopeSustain: 1,
          voice1EnvelopeRelease: 0.5
      }
    };

    this.gain = new Tone.Gain(0.1).toMaster();
    this.synth = new Tone.DuoSynth().connect(this.gain);

    // bindings
    this.handleGain = this.handleGain.bind(this);
    this.handleVibrato = this.handleVibrato.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleEnvelope = this.handleEnvelope.bind(this);

    this.onDownKey = this.onDownKey.bind(this);
    this.onUpKey = this.onUpKey.bind(this);

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.onKeyLifted = this.onKeyLifted.bind(this);
    this.handleClickOctave = this.handleClickOctave.bind(this);
  }
  

  // componentDidMount() {
  //   ReactDOM.findDOMNode(this.refs.divFocus).focus();
  // }

  // componentWillReceiveProps(props) {
  //     if (props.synthApi.settings === null) { console.log('no settings');} else
  //     {this.setState({ name: props.synthApi.name,
  //     settings: props.synthApi.settings });}
    
  // }

  handleGain = e => {
    this.gain.gain.value = e;
  };

  handleVibrato = e => {

    this.synth.vibratoAmount.value = e[0];    
    this.synth.vibratoRate.value = e[1];   
    this.synth.harmonicity.value = e[2];
   
    this.setState({
      settings: Object.assign({}, this.state.settings, {
        vibratoAmount: e[0],
        vibratoRate: e[1],
        harmonicity: e[2]
      })
    });
  };

  handleFilter = e => {

    this.synth.voice0.filterEnvelope.attack = e[0];
    this.synth.voice0.filterEnvelope.decay = e[1];
    this.synth.voice0.filterEnvelope.sustain = e[2];
    this.synth.voice0.filterEnvelope.release = e[3];

    this.synth.voice1.filterEnvelope.attack = e[0];
    this.synth.voice1.filterEnvelope.decay = e[1];
    this.synth.voice1.filterEnvelope.sustain = e[2];
    this.synth.voice1.filterEnvelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        voice0FilterEnvelopeAttack: e[0],
        voice0FilterEnvelopeDecay: e[1],
        voice0FilterEnvelopeSustain: e[2],
        voice0FilterEnvelopeRelease: e[3],
        voice1FilterEnvelopeAttack: e[0],
        voice1FilterEnvelopeDecay: e[1],
        voice1FilterEnvelopeSustain: e[2],
        voice1FilterEnvelopeRelease: e[3]
      })
    });
  };

  handleEnvelope = e => {
 
    this.synth.voice0.envelope.attack = e[0];
    this.synth.voice0.envelope.decay = e[1];
    this.synth.voice0.envelope.sustain = e[2];
    this.synth.voice0.envelope.release = e[3];

    this.synth.voice1.envelope.attack = e[0];
    this.synth.voice1.envelope.decay = e[1];
    this.synth.voice1.envelope.sustain = e[2];
    this.synth.voice1.envelope.release = e[3];

    this.setState({
      settings: Object.assign({}, this.state.settings, {
        voice0EnvelopeAttack: e[0],
        voice0EnvelopeDecay: e[1],
        voice0EnvelopeSustain: e[2],
        voice0EnvelopeRelease: e[3],
        voice1EnvelopeAttack: e[0],
        voice1EnvelopeDecay: e[1],
        voice1EnvelopeSustain: e[2],
        voice1EnvelopeRelease: e[3]
      })
    });
  };

  handleClickOctave(action) {
    switch (action) {
      case "minus":
        this.setState({ octave: this.state.octave - 1 });
        break;
      case "plus":
        this.setState({ octave: this.state.octave + 1 });
        break;
      default:
        this.setState({ octave: 1 });
        break;
    }
  }

  onDownKey(note) {
    this.synth.triggerAttack(note);
  }

  onUpKey(note) {
    this.synth.triggerRelease();
  }

  onKeyPressed = e => {
let keyNote = e.key
let keyBoardKeys = ["z","s","x","d","c","v","g","b","h","n","j","m"]

if ( keyBoardKeys.includes(keyNote) ) { 

    let pressedNote;
    if (keyNote === "z") {
      pressedNote = "C";
    }
    if (keyNote === "s") {
      pressedNote = "C#";
    }
    if (keyNote === "x") {
      pressedNote = "D";
    }
    if (keyNote === "d") {
      pressedNote = "D#";
    }
    if (keyNote === "c") {
      pressedNote = "E";
    }
    if (keyNote === "v") {
      pressedNote = "F";
    }
    if (keyNote === "g") {
      pressedNote = "F#";
    }
    if (keyNote === "b") {
      pressedNote = "G";
    }
    if (keyNote === "h") {
      pressedNote = "G#";
    }
    if (keyNote === "n") {
      pressedNote = "A";
    }
    if (keyNote === "j") {
      pressedNote = "A#";
    }
    if (keyNote === "m") {
      pressedNote = "B";
    }

    if (!this.state.firstPressed) {
      this.synth.triggerAttack(`${pressedNote}${this.state.octave}`);
      this.setState({ firstPressed: !this.state.firstPressed });
    }
  }
  };

  onKeyLifted = e => {
 
    this.synth.triggerRelease();
    this.setState({ firstPressed: !this.state.firstPressed });
  };

  saveSynth = () => {
    let synthFromState = {
      name: this.props.synthApi.name,
      settings: this.state.settings
    };


    fetch(`http://localhost:3000/instruments/${this.props.synthApi.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(synthFromState)
      // body: {"settings": this.state.settings}
    })
      .then(res => res.json())
      .then(synthObject => {
        console.log("promised synth: ", synthObject);
        console.log("compared this.props.synthApi: ", this.props.synthApi);
      });
  };

  test = e => {
    console.log('test e: ', e);
    e.state ? this.synth.triggerAttack(e.note) : this.synth.triggerRelease();

  }

  render() {

    return (
      <div
        className="duo-synth"
        // tabIndex={1}
        // ref="divFocus"
        // onKeyPress={this.onKeyPressed}
        // onKeyUp={this.onKeyLifted}
      >
        <div className="handler">
          <Dial value="0.4" onChange={this.handleGain} />
          Gain
        </div>

        <div className="handler">
          <Multislider
            size={[100, 100]}
            numberOfSliders="3"
            min="0"
            max="10"
            candycane="3"
            values={[
              this.state.settings.vibratoAmount,
              this.state.settings.vibratoRate,
              this.state.settings.harmonicity
            ]}
            onChange={this.handleVibrato}
          />
          Vibrato
        </div>

        <div className="handler">
          <Multislider
            size={[100, 100]}
            numberOfSliders="3"
            min="0"
            max="10"
            candycane="3"
            values={[
              this.state.settings.voice0FilterEnvelopeAttack,
              this.state.settings.voice0FilterEnvelopeDecay,
              this.state.settings.voice0FilterEnvelopeSustain,
              this.state.settings.voice0FilterEnvelopeRelease
            ]}
            onChange={this.handleFilter}
          />
          Filter Envelope
        </div>

        <div className="handler">
          <Multislider
            size={[100, 100]}
            numberOfSliders="4"
            min="0"
            max="10"
            candycane="4"
            values={[
              this.state.settings.voice0EnvelopeAttack,
              this.state.settings.voice0EnvelopeDecay,
              this.state.settings.voice0EnvelopeSustain,
              this.state.settings.voice0EnvelopeRelease
            ]}
            onChange={this.handleEnvelope}
          />
          Envelope
        </div>

        <Piano
            size={[500, 100]}
            mode="button"
            lownote="60"
            hightnote="120"
            
            onChange={this.test}
          />
        {/* <div className="Keys">
          <Key
            note={`C${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Db${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`D${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Eb${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`E${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`F${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Gb${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`G${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Ab${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`A${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`Bb${this.state.octave}`}
            keyColor="black"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
          <Key
            note={`B${this.state.octave}`}
            keyColor="white"
            onDown={this.onDownKey}
            onUp={this.onUpKey}
          />
        </div>
        <Octaves
          octave={this.state.octave}
          handleClick={this.handleClickOctave}
        /> */}
        <span
          role="img"
          aria-label="cross mark"
          className="save-synth"
          onClick={this.saveSynth}
        >
          💾
        </span>
      </div>
    );
  }
}

export default Synth





