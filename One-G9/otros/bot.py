import discord
from discord.ext import commands

intents = discord.Intents.default()
intents.message_content = True
intents.reactions = True
intents.members = True

bot = commands.Bot(command_prefix="!", intents=intents)

PAISES = {
    "🇨🇱": "Chile",
    "🇦🇷": "Argentina",
    "🇲🇽": "México",
    "🇵🇪": "Perú",
    "🇨🇴": "Colombia"
}

mensaje_banderas_id = None

@bot.event
async def on_ready():
    print(f"✅ Bot conectado como {bot.user}")

@bot.command()
async def paises(ctx):
    """Envia el menú de selección de país"""
    global mensaje_banderas_id

    embed = discord.Embed(
        title="Selecciona tu país 🌎",
        description="\n".join([f"{emoji} → {rol}" for emoji, rol in PAISES.items()]),
        color=discord.Color.green()
    )
    msg = await ctx.send(embed=embed)
    mensaje_banderas_id = msg.id

    for emoji in PAISES:
        await msg.add_reaction(emoji)

@bot.event
async def on_raw_reaction_add(payload):
    global mensaje_banderas_id

    if payload.message_id != mensaje_banderas_id:
        return

    if payload.user_id == bot.user.id:
        return

    guild = bot.get_guild(payload.guild_id)
    member = guild.get_member(payload.user_id)
    emoji = str(payload.emoji)

    if emoji not in PAISES:
        return

    channel = bot.get_channel(payload.channel_id)
    msg = await channel.fetch_message(payload.message_id)

    # Quitar otras reacciones del usuario
    for reaction in msg.reactions:
        if str(reaction.emoji) != emoji:
            users = await reaction.users().flatten()
            if member in users:
                await reaction.remove(member)

    # Obtener o crear el rol
    nombre_rol = PAISES[emoji]
    rol = discord.utils.get(guild.roles, name=nombre_rol)
    if rol is None:
        rol = await guild.create_role(name=nombre_rol)
        print(f"🎉 Rol creado: {rol.name}")

    # Quitar otros roles de país
    roles_a_quitar = [discord.utils.get(guild.roles, name=n) for n in PAISES.values()]
    await member.remove_roles(*[r for r in roles_a_quitar if r and r in member.roles])
    await member.add_roles(rol)

    print(f"✅ {member.name} asignado a: {rol.name}")

bot.run("MTM5NjYxNTU4MDMxNTgxMTg0MA.G3Zhg1.msVdYr2eq0pvNSqyZ2xssRuEy514HfM814QosY")
