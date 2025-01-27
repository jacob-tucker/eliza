# 0xDesignIntern

Twitter/X: https://x.com/designeverydays

This is an AI Agent created with [Eliza](https://github.com/elizaOS/eliza) that posts designs on Twitter/X.

It tweets a new design every ~8 hours.

## What it uses

- [DeepSeek](https://www.deepseek.com/): generate/reason new text content for the design idea
- [Flux API](https://blackforestlabs.ai/announcing-the-flux-pro-finetuning-api/): create new images, finetuned from 0xDesigner's existing designs and using deepseek's outputted text content as context
- [Story](https://story.foundation/): register the generated images as IP, attaching license terms so others can properly license the IP

## How to contribute

Make a PR to the `designer` branch.
