Logger = require "../utils/Logger"
Format = require "../utils/Format"
Types  = require "../Types"

logger = Logger.get()
readableSize = Format.readableSize
readableBytes = Format.readableBytes
tvSystemToString = Types.TVSystem.toString
mirroringToString = Types.Mirroring.toString

###########################################################
# Factory for cartridge creation
###########################################################

class CartridgeFactory

    @inject: [ "loaderFactory" ]

    fromArrayBuffer: (arrayBuffer) ->
        ArrayBufferReader = require "./readers/ArrayBufferReader"
        @fromReader new ArrayBufferReader arrayBuffer

    fromLocalFile: (filePath) ->
        LocalFileReader   = require "./readers/LocalFileReader"
        @fromReader new LocalFileReader filePath

    fromReader: (reader) ->
        loader = @loaderFactory.createLoader reader
        cartridge = loader.loadCartridge()
        @printCartridgeInfo cartridge
        cartridge

    printCartridgeInfo: (cartridge) ->
        logger.info "==========[Cartridge Info - Start]=========="
        logger.info "Mapper ID          : #{cartridge.mapperId}"
        logger.info "has PRG RAM        : #{cartridge.hasPRGRAM}"
        logger.info "has PRG RAM battery: #{cartridge.hasPRGRAMBattery}"
        logger.info "has CHR RAM        : #{cartridge.hasCHRRAM}"
        logger.info "has BUS conflicts  : #{cartridge.hasBUSConflicts}"
        logger.info "has trainer        : #{cartridge.hasTrainer}"
        logger.info "PRG ROM size       : #{readableSize cartridge.prgROMSize ? cartridge.prgROM.length}"
        logger.info "PRG RAM size       : #{readableSize cartridge.prgRAMSize}"
        logger.info "CHR ROM size       : #{readableSize cartridge.chrROMSize ? cartridge.chrROM.length}"
        logger.info "CHR RAM size       : #{readableSize cartridge.chrRAMSize}"
        logger.info "Mirroring          : #{mirroringToString cartridge.mirroring}"
        logger.info "TV system          : #{tvSystemToString cartridge.tvSystem}"
        logger.info "is Vs Unisistem    : #{cartridge.isVsUnisistem}"
        logger.info "is PlayChoice      : #{cartridge.isPlayChoice}"
        logger.info "Trainer            : #{readableBytes cartridge.trainer}"
        logger.info "==========[Cartridge Info - End]=========="

module.exports = CartridgeFactory
