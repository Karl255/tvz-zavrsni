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
		COINS = "COINS",
		WALLET_FILLED = "WALLET_FILLED",
		CARD = "CARD",
		PIGGYBANK = "PIGGYBANK",
		ADD_CARD = "ADD_CARD",
		CHECK = "CHECK",
		ADD_TAG = "ADD_TAG",
		EDIT_TAG = "EDIT_TAG",
		ARROW_LEFT = "ARROW_LEFT",
		ARROW_RIGHT = "ARROW_RIGHT",
		EURO = "EURO",
		FILTER = "FILTER",
		SELECT_LIST = "SELECT_LIST",
		IMPORT = "IMPORT",
		PLUS_MINUS = "PLUS_MINUS",
	}
</script>

<script lang="ts">
	export let icon: IconType;
	export let inline = false;
</script>

<!-- Material Design Icons -->
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="24"
	height="24"
	viewBox="0 0 24 24"
	class:inline
	{...$$restProps}
>
	<!-- prettier-ignore -->
	{#if icon === IconType.SAVE}
		<path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"/>

	{:else if icon === IconType.EDIT}
		<path fill="currentColor" d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"/>

	{:else if icon === IconType.X}
		<path fill="currentColor" d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/>

	{:else if icon === IconType.DELETE}
		<path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/>

	{:else if icon === IconType.LOGOUT}
		<path fill="currentColor" d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"/>

	{:else if icon === IconType.DASHBOARD}
		<path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6zm2-10h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"/>

	{:else if icon === IconType.HISTORY}
		<path fill="currentColor" d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9q0 .425-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4q.425 0 .713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7q.425 0 .713.288T13 8z"/>

	{:else if icon === IconType.WALLET}
		<path fill="currentColor" d="M5 19V5zm0 2q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v2.5h-2V5H5v14h14v-2.5h2V19q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm7-2V9h-7v6zm-4-1.5q.625 0 1.063-.437T17.5 12q0-.625-.437-1.062T16 10.5q-.625 0-1.062.438T14.5 12q0 .625.438 1.063T16 13.5"/>

	{:else if icon === IconType.TAG}
		<path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5"/>

	{:else if icon === IconType.PLUS}
		<path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"/>

	{:else if icon === IconType.COINS}
		<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 14c0 1.657 2.686 3 6 3s6-1.343 6-3s-2.686-3-6-3s-6 1.343-6 3"/><path d="M9 14v4c0 1.656 2.686 3 6 3s6-1.344 6-3v-4M3 6c0 1.072 1.144 2.062 3 2.598s4.144.536 6 0c1.856-.536 3-1.526 3-2.598c0-1.072-1.144-2.062-3-2.598s-4.144-.536-6 0C4.144 3.938 3 4.928 3 6"/><path d="M3 6v10c0 .888.772 1.45 2 2"/><path d="M3 11c0 .888.772 1.45 2 2"/></g>

	{:else if icon === IconType.WALLET_FILLED}
		<path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5h-8q-1.775 0-2.887 1.113T9 9v6q0 1.775 1.113 2.888T13 19h8q0 .825-.587 1.413T19 21zm8-4q-.825 0-1.412-.587T11 15V9q0-.825.588-1.412T13 7h7q.825 0 1.413.588T22 9v6q0 .825-.587 1.413T20 17zm3-3.5q.65 0 1.075-.425T17.5 12q0-.65-.425-1.075T16 10.5q-.65 0-1.075.425T14.5 12q0 .65.425 1.075T16 13.5"/>

	{:else if icon === IconType.CARD}
		<path fill="currentColor" d="M22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6M4 8h16V6H4zm0 4v6h16v-6zm0 6V6z"/>

	{:else if icon === IconType.PIGGYBANK}
		<path fill="currentColor" d="M16 11q.425 0 .713-.288T17 10q0-.425-.288-.712T16 9q-.425 0-.712.288T15 10q0 .425.288.713T16 11M8 9h5V7H8zM4.5 21q-.85-2.85-1.675-5.687T2 9.5q0-2.3 1.6-3.9T7.5 4h5q.725-.95 1.763-1.475T16.5 2q.625 0 1.063.438T18 3.5q0 .15-.038.3t-.087.275q-.1.275-.187.563t-.138.587L19.825 7.5H22v6.975l-2.825.925L17.5 21H12v-2h-2v2zM6 19h2v-2h6v2h2l1.55-5.15l2.45-.825V9.5h-1L15.5 6q0-.5.063-.962t.187-.938q-.725.2-1.275.688T13.675 6H7.5Q6.05 6 5.025 7.025T4 9.5q0 2.45.675 4.788T6 19m6-7.45"/>

	{:else if icon === IconType.ADD_CARD}
		<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v6H4v6h10v2zM4 8h16V6H4zm15 14v-3h-3v-2h3v-3h2v3h3v2h-3v3zM4 18V6z"/>

	{:else if icon === IconType.CHECK}
		<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"/>

	{:else if icon === IconType.ADD_TAG}
		<path fill="currentColor" d="M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m0 0A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5m14.91 6.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l.41.4a5.62 5.62 0 0 1 2.08-.74L4 11V4h7l9 9l-7 7l-1.08-1.08a5.57 5.57 0 0 1-.74 2.08l.41.41A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M6.5 5A1.5 1.5 0 1 0 8 6.5A1.5 1.5 0 0 0 6.5 5M10 19H7v3H5v-3H2v-2h3v-3h2v3h3Z"/>

	{:else if icon === IconType.EDIT_TAG}
		<path fill="currentColor" d="m21.41 11.58l-9-9C12.04 2.21 11.53 2 11 2H4c-.53 0-1.04.21-1.41.59C2.21 2.96 2 3.47 2 4v7c0 .26.05.53.15.77c.1.23.25.46.44.65l1.98 1.98L6 13l-2-2V4h7l9 9l-7 7l-2.13-2.13l-.17.17v-.01l-1.25 1.25l2.14 2.14c.38.37.88.58 1.41.58c.53 0 1.04-.21 1.41-.59l7-7c.38-.37.59-.88.59-1.41c0-.26-.05-.5-.15-.77c-.1-.23-.25-.46-.44-.65M6.5 5a1.5 1.5 0 0 1 1.39.93c.11.27.14.57.08.86c-.06.29-.2.56-.41.77c-.21.21-.48.35-.77.41c-.29.06-.59.03-.86-.08A1.5 1.5 0 0 1 6.5 5m4.2 10.35l1-1a.55.55 0 0 0 0-.77l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1zm-2.64-1.47L2 19.94V22h2.06l6.05-6.07z"/>

	{:else if icon === IconType.ARROW_LEFT}
		<path fill="currentColor" d="m7.825 13l5.6 5.6L12 20l-8-8l8-8l1.425 1.4l-5.6 5.6H20v2z"/>

	{:else if icon === IconType.ARROW_RIGHT}
		<path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12q0-.425.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375q0 .2-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>

	{:else if icon === IconType.EURO}
		<path fill="currentColor" d="M15 21q-2.95 0-5.25-1.675T6.5 15H4q-.425 0-.712-.288T3 14q0-.425.288-.712T4 13h2.05q-.075-.6-.062-1.112T6.05 11H4q-.425 0-.712-.288T3 10q0-.425.288-.712T4 9h2.5q.95-2.65 3.25-4.325T15 3q1.45 0 2.763.425T20.2 4.65q.35.25.375.663T20.3 6q-.3.3-.725.313T18.8 6.1q-.825-.525-1.787-.812T15 5q-2.125 0-3.8 1.113T8.675 9H14q.425 0 .713.288T15 10q0 .425-.288.713T14 11H8.075q-.1.675-.075 1.188t.075.812H14q.425 0 .713.288T15 14q0 .425-.288.713T14 15H8.675q.85 1.775 2.525 2.888T15 19q1.05 0 2.013-.3t1.787-.825q.35-.225.775-.2T20.3 18q.3.275.275.688t-.375.662q-1.125.8-2.437 1.225T15 21"/>

	{:else if icon === IconType.FILTER}
		<path fill="currentColor" d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20zm1-7.7L16.95 6h-9.9zm0 0"/>

	{:else if icon === IconType.SELECT_LIST}
		<path fill="currentColor" d="M16 21q-.825 0-1.412-.587T14 19v-4q0-.825.588-1.412T16 13h4q.825 0 1.413.588T22 15v4q0 .825-.587 1.413T20 21zm0-2h4v-4h-4zM3 18q-.425 0-.712-.288T2 17q0-.425.288-.712T3 16h7q.425 0 .713.288T11 17q0 .425-.288.713T10 18zm13-7q-.825 0-1.412-.587T14 9V5q0-.825.588-1.412T16 3h4q.825 0 1.413.588T22 5v4q0 .825-.587 1.413T20 11zm0-2h4V5h-4zM3 8q-.425 0-.712-.288T2 7q0-.425.288-.712T3 6h7q.425 0 .713.288T11 7q0 .425-.288.713T10 8zm15-1"/>

	{:else if icon === IconType.IMPORT}
		<path fill="currentColor" d="m8.84 12l-4.92 4.92L2.5 15.5L5 13H0v-2h5L2.5 8.5l1.42-1.42zM12 3C8.59 3 5.68 4.07 4.53 5.57L5 6l1.03 1.07C6 7.05 6 7 6 7c0-.5 2.13-2 6-2s6 1.5 6 2s-2.13 2-6 2c-2.62 0-4.42-.69-5.32-1.28l3.12 3.12c.7.1 1.44.16 2.2.16c2.39 0 4.53-.53 6-1.36v2.81c-1.3.95-3.58 1.55-6 1.55c-.96 0-1.9-.1-2.76-.27l-1.65 1.64c1.32.4 2.82.63 4.41.63c2.28 0 4.39-.45 6-1.23V17c0 .5-2.13 2-6 2s-6-1.5-6-2v-.04L5 18l-.46.43C5.69 19.93 8.6 21 12 21c4.41 0 8-1.79 8-4V7c0-2.21-3.58-4-8-4"/>
	
	{:else if icon === IconType.PLUS_MINUS}
		<path fill="currentColor" d="M18 10.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2m0 10H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"/>
	
	{:else}
		<path fill="currentColor" d="M14.6 8.075q0-1.075-.712-1.725T12 5.7q-.725 0-1.312.313t-1.013.912q-.4.575-1.088.663T7.4 7.225q-.35-.325-.387-.8t.237-.9q.8-1.2 2.038-1.862T12 3q2.425 0 3.938 1.375t1.512 3.6q0 1.125-.475 2.025t-1.75 2.125q-.925.875-1.25 1.363T13.55 14.6q-.1.6-.513 1t-.987.4q-.575 0-.987-.387t-.413-.963q0-.975.425-1.787T12.5 11.15q1.275-1.125 1.688-1.737t.412-1.338M12 22q-.825 0-1.412-.587T10 20q0-.825.588-1.412T12 18q.825 0 1.413.588T14 20q0 .825-.587 1.413T12 22"/>
	{/if}
</svg>

<style>
	svg {
		max-width: unset;
	}

	.inline {
		display: inline-block;
		vertical-align: middle;
	}
</style>
