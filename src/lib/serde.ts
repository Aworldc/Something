type DeSerializedData = {
    [index: string | number]: any
}

type SerializedData = string | DeSerializedData
type PluginCfg = { [index: string]: any }

export abstract class Plugin {
    abstract getName(): string
    abstract deserialize(
        data: SerializedData,
        options: PluginCfg
    ): DeSerializedData
    abstract serialize(
        data: DeSerializedData,
        options: PluginCfg
    ): SerializedData
}

type PluginStore = {
    [name: string]: Plugin
}

export class Serde {
    private plugins: PluginStore
    constructor(plugins: Array<Plugin>) {
        plugins.forEach(plug => (this.plugins[plug.getName()] = plug))
    }

    from(value: SerializedData, type: string | PluginCfg): DeSerializedData {
        let plugin = typeof type == 'string' ? type : type.type
        let deserialized = this.plugins[plugin].deserialize(
            value,
            typeof type == 'string' ? {} : type
        )

        return new Deserialized(deserialized, this.plugins)
    }
}

export class Deserialized {
    private value: DeSerializedData
    private plugins: { [name: string]: Plugin }
    constructor(value: DeSerializedData, plugins: { [name: string]: Plugin }) {
        this.value = value
        this.plugins = plugins
    }

    to(type: string | PluginCfg) {
        let plugin = typeof type == 'string' ? type : type.type
        return this.plugins[plugin].serialize(
            this.value,
            typeof type == 'string' ? {} : type
        )
    }
}
