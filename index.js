import prompts from "prompts";
import chalk from "chalk";

const codecsConfigs = {
  "--avif": `--avif '{"cqLevel":33,"cqAlphaLevel":-1,"denoiseLevel":0,"tileColsLog2":0,"tileRowsLog2":0,"speed":6,"subsample":1,"chromaDeltaQ":false,"sharpness":0,"tune":0}'`,
  "--jxl": `--jxl '{"speed":4,"quality":75,"progressive":false,"epf":-1,"nearLossless":0,"lossyPalette":false,"decodingSpeedTier":0}'`,
  "--mozjpeg": `--mozjpeg '{"quality":75,"baseline":false,"arithmetic":false,"progressive":true,"optimize_coding":true,"smoothing":0,"color_space":3,"quant_table":3,"trellis_multipass":false,"trellis_opt_zero":false,"trellis_opt_table":false,"trellis_loops":1,"auto_subsample":true,"chroma_subsample":2,"separate_chroma_quality":false,"chroma_quality":75}'`,
  "--oxipng": `--oxipng '{"level":2,"interlace":false}'`,
  "--webp": `--webp '{"quality":75,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}'`,
  "--wp2": `--wp2 '{"quality":75,"alpha_quality":75,"effort":5,"pass":1,"sns":50,"uv_mode":3,"csp_type":0,"error_diffusion":0,"use_random_matrix":false}'`,
};

(async () => {
  const response = await prompts([
    {
      type: "autocompleteMultiselect",
      name: "codecs",
      message: "Choose codecs",
      choices: [
        { value: "--mozjpeg", title: "MozJPEG" },
        { value: "--webp", title: "WebP" },
        { value: "--avif", title: "AVIF" },
        { value: "--jxl", title: "JPEG-XL" },
        { value: "--wp2", title: "WebP2" },
        { value: "--oxipng", title: "OxiPNG" },
      ],
      hint: "(Space to select. Return to submit. Choose at least one codec.)",
      min: 1,
      instructions: false,
    },
  ]);

  const codecs = response?.codecs?.reduce((accumulator, currentValue) => {
    return `${accumulator} ${codecsConfigs[currentValue]}`;
  }, "");

  const command = `npx @squoosh/cli ${codecs}`;

  if (codecs) {
    console.log("");
    console.log(chalk.green("Copy command:"));
    console.log(command);
  }
})();
