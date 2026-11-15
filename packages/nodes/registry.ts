import { NodeDefinition } from './types';

const nodeDefinitions = new Map<string, NodeDefinition>();

export function useNodesRegistry() {
  function registerNodeDefinition(newNodeDefinition: NodeDefinition) {
    if (nodeDefinitions.has(newNodeDefinition.type))
      throw new Error(`Node type already registered: ${newNodeDefinition.type}`);
    nodeDefinitions.set(newNodeDefinition.type, newNodeDefinition);
  }

  function getNodeDefinition(type: string): NodeDefinition {
    const nodeDefinition = nodeDefinitions.get(type);

    if (!nodeDefinition) throw Error(`Unknown node type ${type}`);
    return nodeDefinition;
  }

  function getAllNodeDefinitions(): NodeDefinition[] {
    return [...nodeDefinitions.values()];
  }

  return { useNodesRegistry, getNodeDefinition, getAllNodeDefinitions };
}
