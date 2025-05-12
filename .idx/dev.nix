{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.pnpm
    pkgs.jdk17
  ];
  idx.extensions = [
    "GoogleCloudTools.firebase-dataconnect-vscode"
    "GraphQL.vscode-graphql-syntax"
  ];
  idx.workspace.onCreate = {
    install-dependencies = "pnpm install";
  };
  idx.previews = {
    enable = true; 
    previews = {
      web = {
        command = [
          "pnpm"
          "run" 
          "dev" 
          "--port"
          "$PORT" 
        ];
        manager = "web";
      };
    };
  };
}