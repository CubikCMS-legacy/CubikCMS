import "colors";

export enum LogLevel {
    STEP,
    DEBUG,
    INFO,
    WARN,
    ERROR,
    FATAL,
}

export class Logger {
    public streamwriter: typeof console;

    private readonly lvlTags   = [ "STEP",  "DEBUG",  "INFO",    "WARN",    "ERROR",  "FATAL" ];
    private readonly lvlColors = [ "gray",  "grey",   "reset",   "yellow",  "red",    "red"   ];
    // Colors are resolved from the color argument

    constructor() {
        this.streamwriter = console;
    }

    public log(level: LogLevel, ...data: string[]) {
        const lvlTag = this.lvlTags[level];
        const lvlColor = this.lvlColors[level];
        const spaces = " ".repeat(5 - lvlTag.length);

        data.unshift(`[${new Date().toLocaleTimeString()}][${lvlTag}]` + spaces);

        data = data.map(
            (d) => d.toString()[lvlColor as any]
        );

        if (level === LogLevel.ERROR) {
            return this.streamwriter.error(...data);
        } else {
            return this.streamwriter.log(...data);
        }
    }

    public fatal(...data: string[]) {
        this.log(LogLevel.FATAL, ...data);
    }

    public error(...data: string[]) {
        this.log(LogLevel.ERROR, ...data);
    }

    public warning(...data: string[]) {
        this.log(LogLevel.WARN, ...data);
    }

    public info(...data: string[]) {
        this.log(LogLevel.INFO, ...data);
    }

    public debug(...data: string[]) {
        this.log(LogLevel.DEBUG, ...data);
    }

    public step(...data: string[]) {
        this.log(LogLevel.STEP, ...data);
    }
}
