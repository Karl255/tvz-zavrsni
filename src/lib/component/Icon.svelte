<script
	lang="ts"
	context="module"
>
	export enum IconType {
		SAVE = "SAVE",
		EDIT = "EDIT",
		X = "X",
		DELETE = "DELETE",
		LOGOUT = "LOGOUT",
		DASHBOARD = "DASHBOARD",
		HISTORY = "HISTORY",
		WALLET = "WALLET",
		TAG = "TAG",
		PLUS = "PLUS",
		ADMIN = "ADMIN",
		COINS = "COINS",
		WALLET_FILLED = "WALLET_FILLED",
		CARD = "CARD",
		PIGGYBANK = "PIGGYBANK",
		ADD_CARD = "ADD_CARD",
		CHECK = "CHECK",
		ADD_TAG = "ADD_TAG",
		EDIT_TAG = "EDIT_TAG",
		ARROW_RIGHT = "ARROW_RIGHT",
		EURO = "EURO",
		SEARCH = "SEARCH",
		SEARCH2 = "SEARCH2",
		FILTER = "FILTER",
	}
</script>

<script lang="ts">
	export let icon: IconType;
	export let inline = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	class:inline
	{...$$restProps}
>
	{#if icon === IconType.SAVE}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"/>
	{:else if icon === IconType.EDIT}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>
	{:else if icon === IconType.X}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/>
	{:else if icon === IconType.DELETE}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>
	{:else if icon === IconType.LOGOUT}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/>
	{:else if icon === IconType.DASHBOARD}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"/>
	{:else if icon === IconType.HISTORY}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9q0 .425-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4q.425 0 .713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7q.425 0 .713.288T13 8z"/>
	{:else if icon === IconType.WALLET}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M5 19V5zm0 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm7-2V9h-7v6zm-4-1.5q.625 0 1.063-.437T17.5 12q0-.625-.437-1.062T16 10.5q-.625 0-1.062.438T14.5 12q0 .625.438 1.063T16 13.5"/>
	{:else if icon === IconType.TAG}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5"/>
	{:else if icon === IconType.PLUS}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/>
	{:else if icon === IconType.ADMIN}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M17 17q.625 0 1.063-.437T18.5 15.5q0-.625-.437-1.062T17 14q-.625 0-1.062.438T15.5 15.5q0 .625.438 1.063T17 17m0 3q.775 0 1.425-.363t1.05-.962q-.55-.325-1.175-.5T17 18q-.675 0-1.3.175t-1.175.5q.4.6 1.05.963T17 20m-5 2q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v5.675q-.475-.2-.975-.363T18 10.076V6.4l-6-2.25L6 6.4v4.7q0 1.175.313 2.35t.875 2.238Q7.75 16.75 8.55 17.65t1.775 1.5q.275.8.725 1.525t1.025 1.3q-.025 0-.037.013T12 22m5 0q-2.075 0-3.537-1.463T12 17q0-2.075 1.463-3.537T17 12q2.075 0 3.538 1.463T22 17q0 2.075-1.463 3.538T17 22m-5-10.35"/>
	{:else if icon === IconType.COINS}
		<!-- prettier-ignore -->
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3s-2.686-3-6-3s-6 1.343-6 3"/><path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598c0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6"/><path d="M3 6v10c0 .888.772 1.45 2 2"/><path d="M3 11c0 .888.772 1.45 2 2"/></g>
	{:else if icon === IconType.WALLET_FILLED}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5h-8q-1.775 0-2.887 1.113T9 9v6q0 1.775 1.113 2.888T13 19h8q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm3-3.5q.65 0 1.075-.425T17.5 12q0-.65-.425-1.075T16 10.5q-.65 0-1.075.425T14.5 12q0 .65.425 1.075T16 13.5"/>
	{:else if icon === IconType.CARD}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6M4 8h16V6H4zm0 4v6h16v-6zm0 6V6z"/>
	{:else if icon === IconType.PIGGYBANK}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M16 11q.425 0 .713-.288T17 10q0-.425-.288-.712T16 9q-.425 0-.712.288T15 10q0 .425.288.713T16 11M8 9h5V7H8zM4.5 21q-.85-2.85-1.675-5.687T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.725-.95 1.763-1.475T16.5 2q.625 0 1.063.438T18 3.5q0 .15-.038.3t-.087.275q-.1.275-.187.563t-.138.587L19.825 7.5H22v6.975l-2.825.925L17.5 21H12v-2h-2v2zM6 19h2v-2h6v2h2l1.55-5.15l2.45-.825V9.5h-1L15.5 6q0-.5.063-.962t.187-.938q-.725.2-1.275.688T13.675 6H7.5Q6.05 6 5.025 7.025T4 9.5q0 2.45.675 4.788T6 19m6-7.45"/>
	{:else if icon === IconType.ADD_CARD}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v6H4v6h10v2zM4 8h16V6H4zm15 14v-3h-3v-2h3v-3h2v3h3v2h-3v3zM4 18V6z"/>
	{:else if icon === IconType.CHECK}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"/>
	{:else if icon === IconType.ADD_TAG}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m0 0A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m14.91 6.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l.41.4a5.62 5.62 0 0 1 2.08-.74L4 11V4h7l9 9l-7 7l-1.08-1.08a5.57 5.57 0 0 1-.74 2.08l.41.41A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5M10 19H7v3H5v-3H2v-2h3v-3h2v3h3Z"/>
	{:else if icon === IconType.EDIT_TAG}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="m21.41 11.58l-9-9C12.04 2.21 11.53 2 11 2H4c-.53 0-1.04.21-1.41.59C2.21 2.96 2 3.47 2 4v7c0 .26.05.53.15.77c.1.23.25.46.44.65l1.98 1.98L6 13l-2-2V4h7l9 9l-7 7l-2.13-2.13l-.17.17v-.01l-1.25 1.25l2.14 2.14c.38.37.88.58 1.41.58c.53 0 1.04-.21 1.41-.59l7-7c.38-.37.59-.88.59-1.41c0-.26-.05-.5-.15-.77c-.1-.23-.25-.46-.44-.65M6.5 5a1.5 1.5 0 0 1 1.39.93c.11.27.14.57.08.86c-.06.29-.2.56-.41.77c-.21.21-.48.35-.77.41c-.29.06-.59.03-.86-.08A1.5 1.5 0 0 1 6.5 5m4.2 10.35l1-1a.55.55 0 0 0 0-.77l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1zm-2.64-1.47L2 19.94V22h2.06l6.05-6.07z"/>
	{:else if icon === IconType.ARROW_RIGHT}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12q0-.425.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
	{:else if icon === IconType.EURO}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M15 21q-2.95 0-5.25-1.675T6.5 15H4q-.425 0-.712-.288T3 14q0-.425.288-.712T4 13h2.05q-.075-.6-.062-1.112T6.05 11H4q-.425 0-.712-.288T3 10q0-.425.288-.712T4 9h2.5q.95-2.65 3.25-4.325T15 3q1.45 0 2.763.425T20.2 4.65q.35.25.375.663T20.3 6q-.3.3-.725.313T18.8 6.1q-.825-.525-1.787-.812T15 5q-2.125 0-3.8 1.113T8.675 9H14q.425 0 .713.288T15 10q0 .425-.288.713T14 11H8.075q-.1.675-.075 1.188t.075.812H14q.425 0 .713.288T15 14q0 .425-.288.713T14 15H8.675q.85 1.775 2.525 2.888T15 19q1.05 0 2.013-.3t1.787-.825q.35-.225.775-.2T20.3 18q.3.275.275.688t-.375.662q-1.125.8-2.437 1.225T15 21"/>
	{:else if icon === IconType.SEARCH}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"/>
	{:else if icon === IconType.SEARCH2}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M3 19q-.425 0-.712-.288T2 18q0-.425.288-.712T3 17h8q.425 0 .713.288T12 18q0 .425-.288.713T11 19zm0-5q-.425 0-.712-.288T2 13q0-.425.288-.712T3 12h3q.425 0 .713.288T7 13q0 .425-.288.713T6 14zm0-5q-.425 0-.712-.288T2 8q0-.425.288-.712T3 7h3q.425 0 .713.288T7 8q0 .425-.288.713T6 9zm11 7q-2.075 0-3.537-1.463T9 11q0-2.075 1.463-3.537T14 6q2.075 0 3.538 1.463T19 11q0 .725-.213 1.438t-.637 1.312l3.15 3.15q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-3.15-3.15q-.6.425-1.312.638T14 16m0-2q1.25 0 2.125-.875T17 11q0-1.25-.875-2.125T14 8q-1.25 0-2.125.875T11 11q0 1.25.875 2.125T14 14"/>
	{:else if icon === IconType.FILTER}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20zm1-7.7L16.95 6h-9.9zm0 0"/>
	{:else}
		<!-- prettier-ignore -->
		<path fill="currentColor" d="M14.6 8.075q0-1.075-.712-1.725T12 5.7q-.725 0-1.312.313t-1.013.912q-.4.575-1.088.663T7.4 7.225q-.35-.325-.387-.8t.237-.9q.8-1.2 2.038-1.862T12 3q2.425 0 3.938 1.375t1.512 3.6q0 1.125-.475 2.025t-1.75 2.125q-.925.875-1.25 1.363T13.55 14.6q-.1.6-.513 1t-.987.4q-.575 0-.987-.387t-.413-.963q0-.975.425-1.787T12.5 11.15q1.275-1.125 1.688-1.737t.412-1.338M12 22q-.825 0-1.412-.587T10 20q0-.825.588-1.412T12 18q.825 0 1.413.588T14 20q0 .825-.587 1.413T12 22"/>
	{/if}
</svg>

<style>
	.inline {
		display: inline-block;
		vertical-align: middle;
	}
</style>
