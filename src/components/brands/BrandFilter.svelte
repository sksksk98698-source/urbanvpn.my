<script lang="ts">
import type { Airport } from "@/data/airports";

export let airports: Airport[] = [];

let search = "";
let selectedLine = "all";
let selectedPrice = "all";
let onlyMeasured = false;
let onlyTop10 = false;
let sortBy = "rank"; // rank, priceAsc

$: filteredAirports = airports
	.filter((a) => {
		if (search.trim()) {
			const q = search.toLowerCase().trim();
			const matchName =
				a.name.toLowerCase().includes(q) ||
				a.englishName.toLowerCase().includes(q);
			const matchFeatures = a.features.some((f) => f.toLowerCase().includes(q));
			const matchLine = a.lineType.toLowerCase().includes(q);
			const matchProto = a.protocols.some((p) => p.toLowerCase().includes(q));
			if (!matchName && !matchFeatures && !matchLine && !matchProto)
				return false;
		}

		if (selectedLine !== "all") {
			if (selectedLine === "iepl" && !a.lineType.includes("IEPL")) return false;
			if (selectedLine === "iplc" && !a.lineType.includes("IPLC")) return false;
			if (selectedLine === "bgp" && !a.lineType.includes("BGP")) return false;
		}

		if (selectedPrice !== "all") {
			const p = Number.parseFloat(a.entryPrice);
			if (selectedPrice === "low" && p >= 10) return false;
			if (selectedPrice === "mid" && (p < 10 || p > 25)) return false;
			if (
				selectedPrice === "unlimited" &&
				!a.features.some((f) => f.includes("不限时")) &&
				!a.pricePeriod.includes("永久")
			)
				return false;
		}

		if (onlyMeasured && !a.hasSpeedtestImage) return false;
		if (onlyTop10 && !a.isTop10) return false;

		return true;
	})
	.sort((a, b) => {
		if (sortBy === "priceAsc") {
			return Number.parseFloat(a.entryPrice) - Number.parseFloat(b.entryPrice);
		}
		return a.rank - b.rank;
	});
</script>

<div class="space-y-6">
  <!-- Filter Controls -->
  <div class="card-base p-5 rounded-2xl space-y-4">
    <!-- Search Bar -->
    <div class="relative">
      <input
        type="text"
        bind:value={search}
        placeholder="搜索机场名称、协议（如 VLESS）、专线类型（IEPL）、特色功能..."
        class="w-full pl-4 pr-10 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm focus:outline-none focus:border-[var(--primary)] transition"
      />
      {#if search}
        <button
          on:click={() => (search = "")}
          class="absolute right-3 top-3 text-neutral-400 hover:text-neutral-600 text-sm"
        >
          ✕
        </button>
      {/if}
    </div>

    <!-- Filter Buttons Grid -->
    <div class="flex flex-wrap items-center gap-3 text-xs">
      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-neutral-400 font-medium mr-1">线路架构:</span>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedLine === 'all' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedLine = 'all')}
        >全部</button>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedLine === 'iepl' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedLine = 'iepl')}
        >IEPL 商业专线</button>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedLine === 'iplc' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedLine = 'iplc')}
        >IPLC 物理专线</button>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedLine === 'bgp' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedLine = 'bgp')}
        >BGP 隧道中转</button>
      </div>

      <div class="flex items-center gap-1.5 flex-wrap">
        <span class="text-neutral-400 font-medium mr-1">价格预算:</span>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedPrice === 'all' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedPrice = 'all')}
        >全部价格</button>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedPrice === 'low' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedPrice = 'low')}
        >＜ 10元/月 平价</button>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedPrice === 'mid' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedPrice = 'mid')}
        >10 - 25元 主力档</button>
        <button
          class="px-2.5 py-1 rounded-lg border transition font-medium {selectedPrice === 'unlimited' ? 'bg-[var(--primary)] text-white border-[var(--primary)]' : 'bg-black/5 dark:bg-white/5 border-transparent text-neutral-600 dark:text-neutral-400'}"
          on:click={() => (selectedPrice = 'unlimited')}
        >不限时流量包</button>
      </div>

      <!-- Quick Toggles -->
      <div class="flex items-center gap-3 ml-auto">
        <label class="flex items-center gap-1.5 cursor-pointer text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" bind:checked={onlyMeasured} class="rounded text-[var(--primary)]" />
          <span>附带测速实测大图</span>
        </label>
        <label class="flex items-center gap-1.5 cursor-pointer text-neutral-600 dark:text-neutral-300">
          <input type="checkbox" bind:checked={onlyTop10} class="rounded text-[var(--primary)]" />
          <span>Top 10 精选梯队</span>
        </label>
        <select
          bind:value={sortBy}
          class="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300 focus:outline-none"
        >
          <option value="rank">按权威综合排名</option>
          <option value="priceAsc">起步价格由低到高</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Results Count -->
  <div class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1">
    <span>共检索到 <strong class="text-[var(--primary)]">{filteredAirports.length}</strong> 家符合条件的机场品牌</span>
    <span>* 注册链接均已加注安全推广标识</span>
  </div>

  <!-- Cards Grid -->
  {#if filteredAirports.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      {#each filteredAirports as airport (airport.id)}
        <div class="card-base p-5 rounded-2xl flex flex-col justify-between hover:border-[var(--primary)] transition relative group">
          <div>
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2">
                <span class="text-xs px-2.5 py-0.5 rounded-full font-bold {airport.rank === 1 ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20' : airport.rank <= 3 ? 'bg-cyan-500 text-slate-950' : airport.rank <= 10 ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'}">
                  TOP {airport.rank}
                </span>
                <h3 class="text-xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                  <a href={`/brands/${airport.id}/`} class="hover:text-[var(--primary)] transition">
                    {airport.name}
                  </a>
                </h3>
                {#if airport.isMainPush}
                  <span class="text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/30 font-medium">
                    年度主推
                  </span>
                {/if}
              </div>
              <div class="text-right">
                <span class="text-xs text-neutral-400 block font-mono">起步低至</span>
                <span class="text-lg font-bold text-[var(--primary)] font-mono">
                  ¥{airport.entryPrice}
                </span>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5 mb-3.5">
              <span class="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-medium">
                {airport.lineType}
              </span>
              {#each airport.protocols.slice(0, 2) as proto}
                <span class="text-xs px-2 py-0.5 rounded bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 font-mono">
                  {proto}
                </span>
              {/each}
              <span class="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {airport.established}
              </span>
            </div>

            <!-- Price note & Coupon -->
            <div class="bg-black/5 dark:bg-white/5 rounded-xl p-2.5 mb-3.5 flex items-center justify-between text-xs font-mono">
              <span class="text-neutral-500 dark:text-neutral-400">
                计费: {airport.pricePeriod}
              </span>
              {#if airport.coupon}
                <span class="inline-flex items-center gap-1 font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                  券码: {airport.coupon}
                </span>
              {/if}
            </div>

            <!-- Features -->
            <ul class="text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5 mb-4">
              {#each airport.features.slice(0, 3) as f}
                <li class="flex items-start gap-1.5">
                  <span class="text-emerald-500 font-bold">✓</span>
                  <span class="line-clamp-1">{f}</span>
                </li>
              {/each}
            </ul>
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-black/5 dark:border-white/10 flex items-center gap-2">
            <a
              href={`/brands/${airport.id}/`}
              class="btn-regular flex-1 py-2 text-center text-xs font-bold rounded-lg active:scale-95 transition"
            >
              详细实测报告
            </a>
            <a
              href={airport.affUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              class="btn-card flex-1 py-2 text-center text-xs font-bold rounded-lg bg-[var(--primary)] text-white hover:opacity-90 active:scale-95 transition shadow-md shadow-[var(--primary)]/20 flex items-center justify-center gap-1"
            >
              官网注册直达 ↗
            </a>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="card-base p-12 text-center rounded-2xl">
      <div class="text-4xl mb-3">🔍</div>
      <h4 class="text-base font-bold text-neutral-800 dark:text-neutral-200 mb-1">未匹配到符合条件的机场</h4>
      <p class="text-xs text-neutral-500 mb-4">尝试调整搜索关键词或重置筛选条件</p>
      <button
        on:click={() => { search = ''; selectedLine = 'all'; selectedPrice = 'all'; onlyMeasured = false; onlyTop10 = false; }}
        class="btn-regular px-4 py-2 text-xs font-bold rounded-lg"
      >
        重置全部筛选
      </button>
    </div>
  {/if}
</div>
