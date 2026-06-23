export const AudioManager = {
    ctx: new (window.AudioContext || window.webkitAudioContext)(),
    muted: localStorage.getItem('muted') === 'true',
    play(type) {
        if (this.muted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        if (type === 'hit') { osc.frequency.value = 200; gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1); }
        else if (type === 'pickup') { osc.frequency.value = 800; gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05); }
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    },
    toggle() { this.muted = !this.muted; localStorage.setItem('muted', this.muted); }
};
