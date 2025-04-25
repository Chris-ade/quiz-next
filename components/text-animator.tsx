"use client";

import React, { Component, RefObject } from "react";

interface TextAnimatorProps {
  texts: string[];
}

interface QueueItem {
  from: string;
  to: string;
  start: number;
  end: number;
  char?: string;
}

class TextAnimator extends Component<TextAnimatorProps> {
  chars: string;
  frameRequest: number | null;
  frame: number;
  queue: QueueItem[];
  resolve: (() => void) | null;
  introTextRef: RefObject<HTMLDivElement>;

  constructor(props: TextAnimatorProps) {
    super(props);
    this.chars =
      "█▓█ ▒░/▒░ █░▒▓/ █▒▒ ▓▒▓/█<░▒ ▓/░>!<>-_\\/[]{}â–‘â–’â–“â€”Ã¥ÃŸâˆ‚Æ’Â©Ë™âˆ†ËšÃ¦â‰ˆÃ§âˆšâˆ«=+*^?#________Î»$";
    this.frameRequest = null;
    this.frame = 0;
    this.queue = [];
    this.resolve = null;
    this.update = this.update.bind(this);
    this.introTextRef = React.createRef<any>();
  }

  componentDidMount() {
    this.startAnimate();
  }

  componentWillUnmount() {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
  }

  startAnimate() {
    this.animateText(0);
  }

  animateText(currentIndex: number) {
    const texts = this.props.texts;
    const introText = this.introTextRef.current;
    if (!introText) return;

    this.setText(texts[currentIndex]).then(() => {
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        this.animateText(currentIndex);
      }, 2000);
    });
  }

  setText(text: string): Promise<void> {
    return new Promise((resolve) => {
      this.resolve = resolve;
      const oldText = this.introTextRef.current?.innerText || "";
      const maxLength = Math.max(oldText.length, text.length);

      this.queue = [];
      for (let i = 0; i < maxLength; i++) {
        const from = oldText[i] || "";
        const to = text[i] || "";
        const start = Math.floor(40 * Math.random());
        const end = start + Math.floor(40 * Math.random());
        this.queue.push({ from, to, start, end });
      }

      if (this.frameRequest) {
        cancelAnimationFrame(this.frameRequest);
      }
      this.frame = 0;
      this.update();
    });
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0; i < this.queue.length; i++) {
      const item = this.queue[i];
      const { from, to, start, end } = item;

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = this.randomChar();
        }
        output += `<span class="dud">${item.char}</span>`;
      } else {
        output += from;
      }
    }

    if (this.introTextRef.current) {
      this.introTextRef.current.innerHTML = output;
    }

    if (complete === this.queue.length) {
      if (this.resolve) {
        this.resolve();
      }
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar(): string {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  render() {
    return (
      <div id="intro-text" className="intro-text" ref={this.introTextRef}></div>
    );
  }
}

export default TextAnimator;
