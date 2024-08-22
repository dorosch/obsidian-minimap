import { MarkdownView, Plugin, WorkspaceLeaf } from 'obsidian';

export default class MinimapPlugin extends Plugin {
  currentLeaf: WorkspaceLeaf | null = null;
  minimapContainer: HTMLElement | null = null;

  onload() {
    // Get the current viewport of Markdown
    this.currentLeaf = this.app.workspace.getActiveViewOfType(MarkdownView)?.leaf || null;

    // Subscribe to events that affect on the render of the minimap
    this.registerEvent(this.app.workspace.on('active-leaf-change', this.activeLeafChange.bind(this)));

    this.createMinimap();
  }

  activeLeafChange(leaf: WorkspaceLeaf | null) {
    console.log('Change viewport from ', this.currentLeaf, ' to ', leaf);

    this.currentLeaf = leaf;

    this.createMinimap();
  }

  createMinimap() {
    if (this.currentLeaf == null) {
      return;
    }

    console.log('Create minimap for current viewport ', this.currentLeaf);

    const viewContainer = this.currentLeaf?.view.containerEl;
    const contentContainer = viewContainer?.querySelector('.view-content') as HTMLElement;

    if (contentContainer) {
      const oldMinimap = contentContainer.querySelector('.minimap');

      if (oldMinimap) {
        contentContainer.removeChild(oldMinimap);
      }

      contentContainer.appendChild(createEl('div', { cls: 'minimap' }));
    } else {
      console.warn('Unable to get contentContainer');
    }
  }
}
