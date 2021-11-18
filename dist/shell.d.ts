export declare const shell: (
  commandLine: string,
  args?: string[]
) => Promise<{
  stdout: string
  stderr: string
}>
