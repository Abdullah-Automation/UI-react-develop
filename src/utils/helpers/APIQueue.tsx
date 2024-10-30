type APICall = () => Promise<void>;

export default class APIQueue {
  private queue: APICall[];
  private isProcessing: boolean;

  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  public enqueue(call: APICall): void {
    this.queue.push(call);
    this.processQueue();
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    this.isProcessing = true;
    const nextCall = this.queue.shift();

    if (nextCall) {
      try {
        await nextCall();
      } finally {
        this.isProcessing = false;

        this.processQueue();
      }
    }
  }
}
