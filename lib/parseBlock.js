import { TextBlock } from "@/components/TextBlock"

export const parseBlock = (block) => {
  switch (block.type) {
    case "heading_1": {
      // <h1> is reserved for post titles so we use the next level down for post content
      return (
        <h2>
          <TextBlock nodes={block.heading_1.text} />
        </h2>
      )
    }
    case "heading_2": {
      return (
        <h3>
          <TextBlock nodes={block.heading_2.text} />
        </h3>
      )
    }
    case "heading_3": {
      return (
        <h4>
          <TextBlock nodes={block.heading_3.text} />
        </h4>
      )
    }
    case "paragraph": {
      return (
        <p>
          <TextBlock nodes={block.paragraph.text} />
        </p>
      )
    }

    case "numbered_list_item": {
      return (
        <li>
          <TextBlock nodes={block.numbered_list_item.text} />
        </li>
      )
    }

    case "bulleted_list_item": {
      return (
        <li>
          <TextBlock nodes={block.bulleted_list_item.text} />
        </li>
      )
    }

    default: {
      return "Unsupported block :("
    }
  }
}
