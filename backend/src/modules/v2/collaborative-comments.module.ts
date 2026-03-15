export class CollaborativeCommentsModule { mentionParser(input: string) { return input.match(/@\w+/g) || []; } }
