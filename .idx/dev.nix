{pkgs}: {
  channel = "unstable";
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
  ];
  idx.extensions = [
    
  ];
  idx.workspace.onCreate = {
    npm-install = "yarn install";
    # files to open when the workspace is first opened.
    default.openFiles = [ "pages/index.tsx" ];
  };
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "yarn"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}