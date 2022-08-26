import readdirp from "readdirp";
import fs from "fs-extra";
import path from "path";
import {link} from "fs";

export async function genLinkIndexes(config) {
  console.log("generating link indexes...");
  const matchedGuidesPath = path.join(
    config.root_dir,
    config.temp_write_dir,
    config.guide_configs_with_attached_nodes_file_name
  );
  const matchedGuides = await fs.readJSON(matchedGuidesPath);
  const updatedCfgs = [];
  const fullIndex = [];
  for (let cfg of matchedGuides.cfgs) {
    const linkIndex = await generateLinkIndex(cfg);
    cfg.link_index = linkIndex;
    fullIndex.push(...linkIndex);
    updatedCfgs.push(cfg);
  }
  matchedGuides.full_index = fullIndex;
  matchedGuides.cfgs = updatedCfgs;
  await fs.writeJSON(matchedGuidesPath, matchedGuides);
  return;
}

async function generateLinkIndex(guideConfig) {
  console.log(`generating link index for ${guideConfig.id}...`);
  const linkIndex = [];
  let i = 0;
  for (const section of guideConfig.sections) {
    let lookBack = 1;
    let noAnchor = true;
    while (noAnchor) {
      switch (section.type) {
        case "p":
          if (i == 0 || lookBack == 0) {
            linkIndex.push({
              file_dir: guideConfig.file_dir,
              guide_id: guideConfig.id,
              local_ref: "",
              node_id: section.node.id,
            });
            noAnchor = false;
          } else {
            const previousSection = guideConfig.sections[i - lookBack];
            if (previousSection.type == ("h1" || "h2" || "h3" || "h4")) {
              linkIndex.push({
                file_dir: guideConfig.file_dir,
                guide_id: guideConfig.id,
                local_ref: localRef(previousSection.node.label),
                nodeId: section.node.id,
              });
            }
            noAnchor = false;
          }
          break;
        case "langtabs":
          if (i == 0 || lookBack == 0) {
            for (const langtab of section.langtabs) {
              if (langtab.id != "none") {
                linkIndex.push({
                  file_dir: guideConfig.file_dir,
                  guide_id: guideConfig.id,
                  local_ref: "",
                  nodeId: langtab.node.id,
                });
              }
            }
            noAnchor = false;
          } else {
            const previousSection = guideConfig.sections[i - lookBack];
            if (previousSection.type == "h1" || "h2" || "h3" || "h4") {
              for (const langtab of section.langtabs) {
                if (langtab.id != "none") {
                  linkIndex.push({
                    file_dir: guideConfig.file_dir,
                    guide_id: guideConfig.id,
                    local_ref: localRef(previousSection.node.label),
                    nodeId: langtab.node.id,
                  });
                }
              }
              noAnchor = false;
            }
          }
          break;
        default:
          linkIndex.push({
            file_dir: guideConfig.file_dir,
            guide_id: guideConfig.id,
            local_ref: localRef(section.node.label),
            nodeId: section.node.id,
          });
          noAnchor = false;
      }
      lookBack++;
    }
    i++;
  }
  return linkIndex;
  function localRef(a_string) {
    a_string = a_string.toLowerCase();
    a_string = a_string.replaceAll(" ", "-");
    return a_string;
  }
}