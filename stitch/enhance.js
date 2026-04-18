(() => {
  const routeForLabel = {
    '首页': '/',
    '棣栭〉': '/',
    '学习路径': '/learning-path',
    '瀛︿範璺緞': '/learning-path',
    '专题练习': '/practice',
    '涓撻缁冧範': '/practice',
    '文档说明': '/docs',
    '鏂囨。璇存槑': '/docs',
    '工作区': '/',
    '开发文档': '/docs',
    '技术文档': '/docs',
    '线性结构': '/topic/linear',
    '线性表': '/topic/linear',
    '栈与队列': '/topic/stack-queue',
    '鏍堜笌闃熷垪': '/topic/stack-queue',
    '栈': '/topic/stack-queue',
    '鏍?': '/topic/stack-queue',
    '队列': '/practice/bank-queue',
    '树结构': '/topic/tree',
    '树形结构': '/topic/tree',
    '图结构': '/topic/graph',
    '综合实践': '/topic/integrated',
    '学生信息管理': '/practice/student-management',
    '学生信息管理系统': '/practice/student-management',
    '约瑟夫环': '/practice/josephus',
    '表达式求值': '/practice/expression-evaluation',
    '括号匹配': '/practice/bracket-matching',
    '二叉搜索树': '/practice/binary-search-tree',
    '二叉搜索树模拟': '/practice/binary-search-tree',
    '银行排队系统': '/practice/bank-queue',
    '最短路径搜索': '/practice/shortest-path',
    '汉诺塔': '/topic/integrated',
    Home: '/',
    Docs: '/docs',
    Stack: '/topic/stack-queue',
    Queue: '/practice/bank-queue',
    Tree: '/topic/tree',
    Graph: '/topic/graph',
  }

  const pageName = location.pathname.split('/').pop() || ''

  const routeForCurrentPage = {
    'home.html': '/',
    'stack.html': '/topic/stack-queue',
    'student.html': '/practice/student-management',
    'josephus.html': '/practice/josephus',
    'expression.html': '/practice/expression-evaluation',
    'bracket.html': '/practice/bracket-matching',
    'bst.html': '/topic/tree',
    'bank.html': '/practice/bank-queue',
    'shortest.html': '/practice/shortest-path',
    'hanoi.html': '/topic/integrated',
  }

  const clean = (text) => text.replace(/\s+/g, ' ').trim()

  const toRoute = (text) => {
    const normalized = clean(text)
    if (!normalized) return null

    if (routeForLabel[normalized]) {
      return routeForLabel[normalized]
    }

    const partial = Object.entries(routeForLabel).find(([label]) => normalized.includes(label))
    return partial?.[1] ?? null
  }

  const navigateTop = (href) => {
    if (!href || window.top === window) {
      window.location.href = href
      return
    }

    window.top.location.href = href
  }

  const wireLinkLikeNode = (node, href) => {
    if (node.tagName === 'A') {
      node.setAttribute('href', href)
      node.setAttribute('target', '_top')
      return
    }

    if (node.dataset.codexLinkBound === 'true') {
      return
    }

    node.dataset.codexLinkBound = 'true'
    node.style.cursor = 'pointer'
    node.setAttribute('tabindex', '0')
    node.addEventListener('click', () => navigateTop(href))
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        navigateTop(href)
      }
    })
  }

  const rewriteByText = () => {
    const candidates = Array.from(document.querySelectorAll('a, button, span'))

    for (const node of candidates) {
      const text = clean(node.textContent || '')
      if (!text) continue

      const href = toRoute(text)
      if (!href) continue

      if (node.tagName === 'BUTTON') {
        if (node.dataset.codexRouteBound === 'true') {
          continue
        }

        node.dataset.codexRouteBound = 'true'
        node.addEventListener('click', () => navigateTop(href))
        continue
      }

      wireLinkLikeNode(node, href)
    }
  }

  const markActiveNav = () => {
    const currentPath = window.top?.location?.pathname || routeForCurrentPage[pageName] || '/'
    const navNodes = Array.from(document.querySelectorAll('nav a, header a'))

    for (const node of navNodes) {
      const href = node.getAttribute('href')
      if (!href || href === '#') continue

      const active = href === currentPath
      if (!active) continue

      node.style.color = '#165DFF'
      node.style.borderColor = '#165DFF'
    }
  }

  const wireHomeCtas = () => {
    if (pageName !== 'home.html') {
      return
    }

    const buttons = Array.from(document.querySelectorAll('button, a'))

    for (const node of buttons) {
      if (node.dataset.codexHomeCtaBound === 'true') {
        continue
      }

      const text = clean(node.textContent || '')
      node.dataset.codexHomeCtaBound = 'true'

      if (text === '开始学习') {
        const card = node.closest('.glass-card')
        if (card) {
          const cardText = clean(card.textContent || '')
          if (cardText.includes('Tree') || cardText.includes('树') || cardText.includes('鏍?')) {
            node.addEventListener('click', () => navigateTop('/practice/binary-search-tree'))
          } else if (cardText.includes('线性') || cardText.includes('绾挎€')) {
            node.addEventListener('click', () => navigateTop('/topic/linear'))
          } else {
            const href = toRoute(cardText) || '/topic/linear'
            node.addEventListener('click', () => navigateTop(href))
          }
        } else {
          node.addEventListener('click', () => navigateTop('/topic/linear'))
        }
      }

      if (text === '查看演示') {
        node.addEventListener('click', () => navigateTop('/practice/student-management'))
      }

      if (text.includes('进入专题') || text.includes('进入练习') || text.includes('进入实验')) {
        const cardText = clean(node.parentElement?.textContent || '')
        const href = toRoute(cardText)
        if (href) {
          node.addEventListener('click', () => navigateTop(href))
        }
      }

      if (text === '开始探索' || text === '算法分析') {
        const cardText = clean(node.closest('div, article, section')?.textContent || '')
        const href = toRoute(cardText)
        if (href) {
          node.addEventListener('click', () => navigateTop(href))
        }
      }
    }

    const bindCardRoute = (card, href) => {
      if (!card || card.dataset.codexSpecialRouteBound === 'true') {
        return
      }

      card.dataset.codexSpecialRouteBound = 'true'
      card.style.cursor = 'pointer'
      card.addEventListener('click', () => navigateTop(href))

      const innerNodes = Array.from(card.querySelectorAll('button, a, h3, h4, p, span'))
      for (const node of innerNodes) {
        if (node.dataset.codexSpecialRouteBound === 'true') {
          continue
        }
        node.dataset.codexSpecialRouteBound = 'true'
        node.addEventListener('click', (event) => {
          event.preventDefault()
          event.stopPropagation()
          navigateTop(href)
        })
      }
    }

    const bindRouteByHeading = (keywords, href, containerSelector) => {
      const headings = Array.from(document.querySelectorAll('h3, h4'))
      const heading = headings.find((node) => {
        const text = clean(node.textContent || '')
        return keywords.some((keyword) => text.includes(keyword))
      })
      if (!heading) {
        return
      }

      const card = heading.closest(containerSelector)
      bindCardRoute(card, href)
    }

    bindRouteByHeading(['鏍?Stack', '栈 Stack', 'Stack'], '/practice/expression-evaluation', '.glass-card')
    bindRouteByHeading(['闃熷垪 Queue', '队列 Queue', 'Queue'], '/practice/bank-queue', '.glass-card')
    bindRouteByHeading(['鏍?Tree', '树 Tree', 'Tree'], '/practice/binary-search-tree', '.glass-card')
    bindRouteByHeading(['鍥?Graph', '图 Graph', 'Graph'], '/topic/graph', '.glass-card')
    bindRouteByHeading(['姹夎濉旈€掑綊婕旂ず', '汉诺塔递归演示', 'Tower of Hanoi'], '/topic/integrated', '.bg-background')
  }

  const scrollHomeSections = () => {
    if (pageName !== 'home.html') {
      return
    }

    const topPath = window.top?.location?.pathname || '/'
    const headingTargets = {
      '/learning-path': ['学习路径', '核心架构单元'],
      '/practice': ['继续探索', '核心架构单元'],
      '/docs': ['文档说明'],
    }

    const targets = headingTargets[topPath]
    if (!targets) return

    const headings = Array.from(document.querySelectorAll('h2, h3, p'))
    const match = headings.find((node) => targets.includes(clean(node.textContent || '')))
    match?.scrollIntoView({ behavior: 'instant', block: 'start' })
  }

  const wireFooterFallbacks = () => {
    const footerLinks = Array.from(document.querySelectorAll('footer a'))
    for (const node of footerLinks) {
      if ((node.getAttribute('href') || '#') !== '#') continue
      node.setAttribute('href', '/docs')
      node.setAttribute('target', '_top')
    }
  }

  const wireStackPage = () => {
    if (pageName !== 'stack.html' || document.body.dataset.codexStackPageBound === 'true') {
      return
    }

    document.body.dataset.codexStackPageBound = 'true'

    const topNavLinks = Array.from(document.querySelectorAll('header nav a'))
    const topNavTargets = ['/', '/learning-path', '/practice', '/docs']
    topNavLinks.forEach((node, index) => {
      const href = topNavTargets[index]
      if (!href) return
      node.setAttribute('href', href)
      node.setAttribute('target', '_top')
    })

    const breadcrumb = document.querySelector('main > nav')
    if (breadcrumb) {
      const children = Array.from(breadcrumb.children)
      const first = children[0]
      const second = children[2]
      if (first) {
        first.style.cursor = 'pointer'
        first.addEventListener('click', () => navigateTop('/'))
      }
      if (second) {
        second.style.cursor = 'pointer'
        second.addEventListener('click', () => navigateTop('/topic/stack-queue'))
      }
    }

    const stackPanel = document.querySelector('.lg\\:col-span-4.glass-card')
    const appPanel = document.querySelector('.lg\\:col-span-8 .glass-card')
    if (!stackPanel || !appPanel) {
      return
    }

    const stackContainer = stackPanel.querySelector('.flex-1.w-full.flex.flex-col.justify-end.gap-2')
    const controlGrid = stackPanel.querySelector('.grid.grid-cols-2.gap-4.w-full.mt-6')
    const stackButtons = controlGrid ? Array.from(controlGrid.querySelectorAll('button')) : []
    const pushButton = stackButtons[0]
    const popButton = stackButtons[1]

    const expressionInput = appPanel.querySelector('input[type="text"]')
    const runButton = appPanel.querySelector('div.mb-8 button')
    const logicList = appPanel.querySelector('.space-y-2')
    const statusCard = appPanel.querySelector('.h-full.flex.flex-col.items-center.justify-center')
    const statusIcon = statusCard?.querySelector('.material-symbols-outlined')
    const statusTitle = statusCard?.querySelector('span.text-lg')
    const statusDescription = statusCard?.querySelector('p')

    if (!stackContainer || !controlGrid || !pushButton || !popButton || !expressionInput || !runButton || !logicList || !statusCard || !statusIcon || !statusTitle || !statusDescription) {
      return
    }

    const stackInputWrap = document.createElement('div')
    stackInputWrap.className = 'w-full mb-4'
    stackInputWrap.innerHTML = `
      <label class="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Manual Input</label>
      <div class="flex gap-2">
        <input data-stack-input type="text" maxlength="12" placeholder="例如: ( 或 x" class="flex-1 bg-surface-container-lowest border border-white/10 rounded-lg px-3 py-2 text-sm text-primary font-mono focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all" />
        <button data-stack-push-inline class="px-3 bg-primary/15 hover:bg-primary/30 text-primary text-xs font-bold rounded-lg transition-all">Push</button>
      </div>
    `

    stackPanel.insertBefore(stackInputWrap, controlGrid)

    const extraControlGrid = document.createElement('div')
    extraControlGrid.className = 'grid grid-cols-2 gap-4 w-full mt-4'
    extraControlGrid.innerHTML = `
      <button data-stack-peek class="py-3 bg-surface-container-highest hover:bg-secondary/20 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-sm">vertical_align_top</span> Peek
      </button>
      <button data-stack-clear class="py-3 bg-surface-container-highest hover:bg-tertiary/20 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
        <span class="material-symbols-outlined text-sm">delete_sweep</span> Clear
      </button>
    `

    controlGrid.insertAdjacentElement('afterend', extraControlGrid)

    const stackStateCard = document.createElement('div')
    stackStateCard.className = 'w-full mt-4 rounded-lg border border-white/10 bg-surface-container-low p-4 space-y-2'
    stackStateCard.innerHTML = `
      <div class="flex items-center justify-between text-[11px]">
        <span class="text-on-surface-variant uppercase tracking-wider">Size</span>
        <span data-stack-size class="font-mono text-secondary">0/8</span>
      </div>
      <div class="flex items-center justify-between text-[11px]">
        <span class="text-on-surface-variant uppercase tracking-wider">Top</span>
        <span data-stack-top class="font-mono text-primary">EMPTY</span>
      </div>
      <p data-stack-message class="text-xs text-on-surface-variant">Ready for stack operations.</p>
    `

    extraControlGrid.insertAdjacentElement('afterend', stackStateCard)

    const stackInput = stackInputWrap.querySelector('[data-stack-input]')
    const stackPushInlineButton = stackInputWrap.querySelector('[data-stack-push-inline]')
    const stackPeekButton = extraControlGrid.querySelector('[data-stack-peek]')
    const stackClearButton = extraControlGrid.querySelector('[data-stack-clear]')
    const stackSizeNode = stackStateCard.querySelector('[data-stack-size]')
    const stackTopNode = stackStateCard.querySelector('[data-stack-top]')
    const stackMessageNode = stackStateCard.querySelector('[data-stack-message]')

    if (!stackInput || !stackPushInlineButton || !stackPeekButton || !stackClearButton || !stackSizeNode || !stackTopNode || !stackMessageNode) {
      return
    }

    const runActionRow = runButton.parentElement
    const resetButton = document.createElement('button')
    resetButton.type = 'button'
    resetButton.className = 'px-4 rounded-xl border border-white/10 text-on-surface-variant hover:text-white hover:border-primary/40 transition-all flex items-center gap-2'
    resetButton.innerHTML = '<span class="material-symbols-outlined">restart_alt</span> 重置'
    runActionRow?.appendChild(resetButton)

    const parseInitialStack = () => {
      const cards = Array.from(stackContainer.children)
      const valueCards = cards.slice(0, Math.max(cards.length - 1, 0))
      const values = []

      for (const card of valueCards) {
        const text = clean(card.textContent || '')
        const matched = text.match(/'([^']+)'/)
        if (matched?.[1]) {
          values.push(matched[1])
        }
      }

      return values.reverse()
    }

    const MAX_STACK_SIZE = 8
    const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms))
    const openingSet = new Set(['(', '[', '{'])
    const closingPair = {
      ')': '(',
      ']': '[',
      '}': '{',
    }

    const badgeColors = ['text-primary', 'text-secondary', 'text-tertiary', 'text-primary-fixed']
    const bgColors = ['bg-surface-container-highest', 'bg-surface-container-high', 'bg-surface-container']

    const escapeHtml = (value) =>
      value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')

    const initialStack = parseInitialStack()
    let stackState = initialStack.length ? initialStack : ['(', '{', '[']
    let running = false
    let runSerial = 0

    const setStackMessage = (message, tone = 'default') => {
      stackMessageNode.textContent = message
      stackMessageNode.className = 'text-xs'

      if (tone === 'success') {
        stackMessageNode.classList.add('text-secondary')
        return
      }

      if (tone === 'error') {
        stackMessageNode.classList.add('text-error')
        return
      }

      if (tone === 'info') {
        stackMessageNode.classList.add('text-primary')
        return
      }

      stackMessageNode.classList.add('text-on-surface-variant')
    }

    const renderStack = () => {
      stackContainer.innerHTML = ''

      if (stackState.length === 0) {
        const empty = document.createElement('div')
        empty.className = 'w-full h-14 rounded-lg border border-dashed border-white/10 flex items-center justify-center text-[11px] text-white/40 font-label'
        empty.textContent = 'EMPTY STACK'
        stackContainer.appendChild(empty)
      } else {
        for (let index = stackState.length - 1; index >= 0; index -= 1) {
          const value = stackState[index]
          const top = index === stackState.length - 1
          const color = badgeColors[index % badgeColors.length]
          const bg = bgColors[index % bgColors.length]

          const row = document.createElement('div')
          row.className = `w-full h-14 rounded-lg ${bg} border flex items-center justify-between px-4 transition-all ${top ? 'border-primary/60 data-glow' : 'border-white/10'}`
          row.innerHTML = `
            <span class="text-xs text-on-surface-variant font-mono">${String(index + 1).padStart(2, '0')}</span>
            <span class="text-sm font-bold ${color}">字符 '${escapeHtml(String(value))}'</span>
            <span class="material-symbols-outlined text-xs ${top ? 'text-primary' : 'text-on-surface-variant'}">${top ? 'north' : 'keyboard_arrow_down'}</span>
          `

          stackContainer.appendChild(row)
        }
      }

      const base = document.createElement('div')
      base.className = 'w-full h-14 rounded-lg border border-dashed border-white/5 flex items-center justify-center'
      base.innerHTML = '<span class="text-[10px] text-white/10 font-label">STACK_BASE</span>'
      stackContainer.appendChild(base)

      stackSizeNode.textContent = `${stackState.length}/${MAX_STACK_SIZE}`
      stackTopNode.textContent = stackState.length ? String(stackState[stackState.length - 1]) : 'EMPTY'
    }

    const setButtonsDisabled = (disabled) => {
      const nodes = [pushButton, popButton, stackPushInlineButton, stackPeekButton, stackClearButton, runButton, stackInput]

      for (const node of nodes) {
        if (!node) continue

        if ('disabled' in node) {
          node.disabled = disabled
        }

        if (node instanceof HTMLElement) {
          node.classList.toggle('opacity-60', disabled)
          node.classList.toggle('cursor-not-allowed', disabled)
        }
      }
    }

    const appendLogic = (message, tone = 'primary', tag = 'Step') => {
      const palette = {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        tertiary: 'border-tertiary text-tertiary',
        error: 'border-error text-error',
        neutral: 'border-outline text-on-surface-variant',
      }

      const toneClass = palette[tone] || palette.neutral
      const row = document.createElement('div')
      row.className = `flex items-center justify-between p-3 rounded-lg bg-surface-container-high border-l-2 ${toneClass}`
      row.innerHTML = `
        <span class="text-xs font-mono text-white">${escapeHtml(message)}</span>
        <span class="text-[10px] ${toneClass.split(' ')[1]} bg-white/5 px-2 py-0.5 rounded">${escapeHtml(tag)}</span>
      `

      logicList.appendChild(row)
      while (logicList.children.length > 12) {
        logicList.removeChild(logicList.firstChild)
      }
    }

    const resetLogic = () => {
      logicList.innerHTML = ''
    }

    const setStatus = (type, title, description) => {
      statusIcon.className = 'material-symbols-outlined text-5xl mb-2'
      statusCard.classList.remove('from-secondary/5', 'from-primary/10', 'from-error/10', 'from-tertiary/10')

      if (type === 'running') {
        statusIcon.textContent = 'autorenew'
        statusIcon.classList.add('text-primary', 'animate-spin')
        statusCard.classList.add('from-primary/10')
      } else if (type === 'success') {
        statusIcon.textContent = 'check_circle'
        statusIcon.classList.add('text-secondary')
        statusCard.classList.add('from-secondary/5')
      } else if (type === 'error') {
        statusIcon.textContent = 'error'
        statusIcon.classList.add('text-error')
        statusCard.classList.add('from-error/10')
      } else {
        statusIcon.textContent = 'radio_button_checked'
        statusIcon.classList.add('text-tertiary')
        statusCard.classList.add('from-tertiary/10')
      }

      statusTitle.textContent = title
      statusDescription.textContent = description
    }

    const pushValue = (raw) => {
      const value = clean(raw || '')
      if (!value) {
        setStackMessage('请输入要入栈的值。', 'error')
        return
      }

      if (stackState.length >= MAX_STACK_SIZE) {
        setStackMessage(`栈已满（最大 ${MAX_STACK_SIZE}）。`, 'error')
        return
      }

      stackState.push(value)
      renderStack()
      stackInput.value = ''
      setStackMessage(`Push 成功：'${value}'。`, 'success')
      appendLogic(`手动 Push '${value}'`, 'primary', 'Push')
    }

    const popValue = () => {
      if (stackState.length === 0) {
        setStackMessage('当前栈为空，无法 Pop。', 'error')
        return
      }

      const popped = stackState.pop()
      renderStack()
      setStackMessage(`Pop 成功：'${String(popped)}'。`, 'success')
      appendLogic(`手动 Pop '${String(popped)}'`, 'secondary', 'Pop')
    }

    const peekValue = () => {
      if (stackState.length === 0) {
        setStackMessage('当前栈为空，没有栈顶元素。', 'error')
        return
      }

      const top = stackState[stackState.length - 1]
      setStackMessage(`当前栈顶：'${String(top)}'。`, 'info')
      appendLogic(`查看栈顶 -> '${String(top)}'`, 'tertiary', 'Peek')
    }

    const clearStack = () => {
      stackState = []
      renderStack()
      setStackMessage('栈已清空。', 'info')
      appendLogic('手动 Clear stack', 'neutral', 'Clear')
    }

    const runBracketSimulation = async () => {
      if (running) {
        return
      }

      const expression = expressionInput.value || ''
      if (!clean(expression)) {
        setStatus('error', '输入为空', '请输入括号表达式后再运行。')
        setStackMessage('请先输入表达式。', 'error')
        return
      }

      running = true
      runSerial += 1
      const serial = runSerial

      setButtonsDisabled(true)
      resetLogic()
      stackState = []
      renderStack()
      setStatus('running', '正在追踪', '按字符扫描表达式并同步更新栈状态。')
      setStackMessage('模拟执行中...', 'info')

      const simulationStack = []
      let failReason = ''

      for (const char of expression) {
        if (serial !== runSerial) {
          return
        }

        if (!(char in closingPair) && !openingSet.has(char)) {
          continue
        }

        if (openingSet.has(char)) {
          if (simulationStack.length >= MAX_STACK_SIZE) {
            failReason = `容量不足：无法继续压入 '${char}'。`
            appendLogic(`扫描 '${char}' -> 栈容量不足`, 'error', 'Error')
            break
          }

          simulationStack.push(char)
          stackState = [...simulationStack]
          renderStack()
          appendLogic(`扫描 '${char}' -> 入栈`, 'primary', 'Push')
          await sleep(220)
          continue
        }

        const expected = closingPair[char]
        const top = simulationStack[simulationStack.length - 1]

        if (!top) {
          failReason = `遇到 '${char}' 时栈为空。`
          appendLogic(`扫描 '${char}' -> 栈空，匹配失败`, 'error', 'Error')
          break
        }

        if (top !== expected) {
          failReason = `遇到 '${char}' 时期望 '${expected}'，实际 '${top}'。`
          appendLogic(`扫描 '${char}' -> 与 '${top}' 不匹配`, 'error', 'Error')
          break
        }

        simulationStack.pop()
        stackState = [...simulationStack]
        renderStack()
        appendLogic(`扫描 '${char}' -> 与 '${expected}' 匹配并出栈`, 'secondary', 'Match')
        await sleep(220)
      }

      if (!failReason && simulationStack.length > 0) {
        failReason = `表达式结束后仍有未匹配括号：${simulationStack.join(' ')}`
        appendLogic('扫描结束 -> 栈非空，匹配失败', 'error', 'Error')
      }

      if (!failReason) {
        setStatus('success', '表达式合法', '所有括号都已正确匹配并成功弹栈。')
        setStackMessage('括号匹配成功。', 'success')
        appendLogic('模拟完成：匹配成功', 'secondary', 'Done')
      } else {
        setStatus('error', '表达式不合法', failReason)
        setStackMessage(`匹配失败：${failReason}`, 'error')
      }

      running = false
      setButtonsDisabled(false)
    }

    const resetAll = () => {
      if (running) {
        runSerial += 1
        running = false
      }

      expressionInput.value = '{[()]} ( )'
      stackState = [...initialStack.length ? initialStack : ['(', '{', '[']]
      renderStack()
      resetLogic()
      setStatus('idle', '等待运行', '你可以手动操作栈，或运行括号匹配追踪。')
      setStackMessage('状态已重置。', 'info')
      setButtonsDisabled(false)
    }

    pushButton.addEventListener('click', () => pushValue(stackInput.value))
    stackPushInlineButton.addEventListener('click', () => pushValue(stackInput.value))
    popButton.addEventListener('click', popValue)
    stackPeekButton.addEventListener('click', peekValue)
    stackClearButton.addEventListener('click', clearStack)
    runButton.addEventListener('click', runBracketSimulation)
    resetButton.addEventListener('click', resetAll)

    stackInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') {
        return
      }

      event.preventDefault()
      pushValue(stackInput.value)
    })

    renderStack()
    resetLogic()
    appendLogic('页面就绪，可执行手动栈操作与括号匹配追踪。', 'neutral', 'Ready')
    setStatus('idle', '等待运行', '你可以手动操作栈，或运行括号匹配追踪。')
    setStackMessage('核心功能已就绪。', 'success')
  }

  const wireStudentPage = () => {
    if (pageName !== 'student.html' || document.body.dataset.codexStudentPageBound === 'true') {
      return
    }

    document.body.dataset.codexStudentPageBound = 'true'

    const topNavLinks = Array.from(document.querySelectorAll('header nav a'))
    const topNavTargets = ['/', '/learning-path', '/practice', '/docs']
    topNavLinks.forEach((node, index) => {
      const href = topNavTargets[index]
      if (!href) return
      node.setAttribute('href', href)
      node.setAttribute('target', '_top')
    })

    const breadcrumbLinks = Array.from(document.querySelectorAll('main > div a'))
    if (breadcrumbLinks[0]) {
      breadcrumbLinks[0].setAttribute('href', '/')
      breadcrumbLinks[0].setAttribute('target', '_top')
    }
    if (breadcrumbLinks[1]) {
      breadcrumbLinks[1].setAttribute('href', '/topic/linear')
      breadcrumbLinks[1].setAttribute('target', '_top')
    }

    const gridRoot = document.querySelector('.p-8.grid.grid-cols-12.gap-8')
    const heroCard = gridRoot?.querySelector('.col-span-12.flex.items-center.justify-between.bg-surface-container-low')
    const comparisonColumns = Array.from(document.querySelectorAll('.col-span-12.lg\\:col-span-6.space-y-4'))
    const arrayColumn = comparisonColumns[0]
    const linkedColumn = comparisonColumns[1]

    const heroButtons = heroCard ? Array.from(heroCard.querySelectorAll('button')) : []
    const addButton = heroButtons[0]
    const resetButton = heroButtons[1]
    const searchInput = document.querySelector('header input[type="text"]')

    const arrayGrid = arrayColumn?.querySelector('.grid.grid-cols-5.gap-3')
    const linkedCanvas = linkedColumn?.querySelector('.relative.h-48')
    const chartPanel = document.querySelector('.col-span-12.lg\\:col-span-8 .glass-panel')
    const chartRows = chartPanel ? Array.from(chartPanel.querySelectorAll('.space-y-2')) : []
    const randomRow = chartRows[0]
    const mutationRow = chartRows[1]

    const randomTitle = randomRow?.querySelector('.flex.justify-between span:first-child')
    const randomLoad = randomRow?.querySelector('.flex.justify-between span:last-child')
    const randomBars = randomRow?.querySelectorAll('.h-10.flex.gap-1 > div')
    const randomArrayBar = randomBars?.[0]
    const randomLinkedBar = randomBars?.[1]

    const mutationTitle = mutationRow?.querySelector('.flex.justify-between span:first-child')
    const mutationLoad = mutationRow?.querySelector('.flex.justify-between span:last-child')
    const mutationBars = mutationRow?.querySelectorAll('.h-10.flex.gap-1 > div')
    const mutationArrayBar = mutationBars?.[0]
    const mutationLinkedBar = mutationBars?.[1]

    const loggerBox = document.querySelector('.col-span-12.lg\\:col-span-4 .h-\\[180px\\]')
    const tableSection = document.querySelector('.col-span-12 table')?.closest('.glass-panel')
    const table = tableSection?.querySelector('table')
    const tbody = table?.querySelector('tbody')
    const tableSummarySpans = tableSection ? Array.from(tableSection.querySelectorAll('.px-6.py-4 .flex.gap-2 span')) : []
    const totalChip = tableSummarySpans[0]
    const cacheChip = tableSummarySpans[1]

    if (
      !gridRoot ||
      !heroCard ||
      !addButton ||
      !resetButton ||
      !searchInput ||
      !arrayGrid ||
      !linkedCanvas ||
      !randomArrayBar ||
      !randomLinkedBar ||
      !mutationArrayBar ||
      !mutationLinkedBar ||
      !randomTitle ||
      !randomLoad ||
      !mutationTitle ||
      !mutationLoad ||
      !loggerBox ||
      !tableSection ||
      !tbody ||
      !totalChip ||
      !cacheChip
    ) {
      return
    }

    const initialStudents = [
      { id: '20230001', name: '张伟', className: '计算机科学 01', status: '在校' },
      { id: '20230002', name: '王芳', className: '人工智能 02', status: '在校' },
      { id: '20230003', name: '李敏', className: '软件工程 01', status: '休学' },
    ]

    const ARRAY_CAPACITY = 10
    let students = initialStudents.map((item) => ({ ...item }))
    let filteredStudents = students.map((item) => ({ ...item }))
    let searchKeyword = ''
    let highlightedId = ''
    let formMode = 'add'
    let editingId = ''

    const randomMetrics = { label: '随机访问', load: '负载: 低', arrayMs: 2, linkedMs: 142 }
    const mutationMetrics = { label: '中间插入', load: '负载: 3 个元素', arrayMs: 88, linkedMs: 4 }

    const formCard = document.createElement('div')
    formCard.className = 'col-span-12 glass-panel rounded-xl p-5 border border-primary/20'
    formCard.innerHTML = `
      <div class="flex flex-col lg:flex-row gap-5 items-start lg:items-end">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 flex-1 w-full">
          <label class="text-xs text-on-surface-variant uppercase tracking-wider">
            学号
            <input data-student-id type="text" class="mt-2 w-full bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/60" />
          </label>
          <label class="text-xs text-on-surface-variant uppercase tracking-wider">
            姓名
            <input data-student-name type="text" class="mt-2 w-full bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/60" />
          </label>
          <label class="text-xs text-on-surface-variant uppercase tracking-wider">
            班级
            <input data-student-class type="text" class="mt-2 w-full bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/60" />
          </label>
          <label class="text-xs text-on-surface-variant uppercase tracking-wider">
            状态
            <select data-student-status class="mt-2 w-full bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/60">
              <option>在校</option>
              <option>休学</option>
              <option>毕业</option>
            </select>
          </label>
          <label class="text-xs text-on-surface-variant uppercase tracking-wider">
            插入位置
            <input data-student-index type="number" min="0" value="0" class="mt-2 w-full bg-surface-container-low border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-primary/60" />
          </label>
        </div>
        <div class="flex gap-2 shrink-0">
          <button data-student-save class="px-4 py-2 bg-primary-dim hover:bg-primary text-white text-sm font-bold rounded-lg transition-all">新增并对比</button>
          <button data-student-cancel class="px-4 py-2 border border-white/10 text-on-surface-variant hover:text-white hover:border-primary/40 text-sm font-bold rounded-lg transition-all">取消</button>
        </div>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        <button data-student-demo-access class="px-3 py-1.5 text-xs rounded bg-primary/10 text-primary hover:bg-primary/20 transition-all">随机访问测试</button>
        <button data-student-demo-insert class="px-3 py-1.5 text-xs rounded bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all">中间插入测试</button>
        <button data-student-demo-search class="px-3 py-1.5 text-xs rounded bg-tertiary/10 text-tertiary hover:bg-tertiary/20 transition-all">查找测试</button>
        <span data-student-form-tip class="text-xs text-on-surface-variant self-center">新增模式：可指定插入位置并观察顺序表/链表差异。</span>
      </div>
    `

    gridRoot.insertBefore(formCard, heroCard.nextSibling)

    const idInput = formCard.querySelector('[data-student-id]')
    const nameInput = formCard.querySelector('[data-student-name]')
    const classInput = formCard.querySelector('[data-student-class]')
    const statusInput = formCard.querySelector('[data-student-status]')
    const indexInput = formCard.querySelector('[data-student-index]')
    const saveButton = formCard.querySelector('[data-student-save]')
    const cancelButton = formCard.querySelector('[data-student-cancel]')
    const accessDemoButton = formCard.querySelector('[data-student-demo-access]')
    const insertDemoButton = formCard.querySelector('[data-student-demo-insert]')
    const searchDemoButton = formCard.querySelector('[data-student-demo-search]')
    const formTip = formCard.querySelector('[data-student-form-tip]')

    if (
      !idInput ||
      !nameInput ||
      !classInput ||
      !statusInput ||
      !indexInput ||
      !saveButton ||
      !cancelButton ||
      !accessDemoButton ||
      !insertDemoButton ||
      !searchDemoButton ||
      !formTip
    ) {
      return
    }

    const escapeHtml = (value) =>
      value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')

    const now = () => {
      const d = new Date()
      const pad = (n) => String(n).padStart(2, '0')
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }

    const appendLog = (message, tone = 'neutral') => {
      const toneClass = {
        neutral: 'text-slate-400',
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        error: 'text-error',
      }

      const line = document.createElement('div')
      line.className = toneClass[tone] || toneClass.neutral
      line.textContent = `[${now()}] ${message}`
      loggerBox.appendChild(line)

      while (loggerBox.children.length > 40) {
        loggerBox.removeChild(loggerBox.firstChild)
      }

      loggerBox.scrollTop = loggerBox.scrollHeight
    }

    const statusBadge = (status) => {
      if (status === '在校') {
        return 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20'
      }

      if (status === '毕业') {
        return 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20'
      }

      return 'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error/10 text-error border border-error/20'
    }

    const clamp = (num, min, max) => Math.max(min, Math.min(max, num))

    const asWidthPair = (left, right) => {
      const total = Math.max(1, left + right)
      let leftWidth = Math.round((left / total) * 100)
      leftWidth = clamp(leftWidth, 15, 85)
      const rightWidth = 100 - leftWidth
      return [leftWidth, rightWidth]
    }

    const updateMetricBars = () => {
      randomTitle.textContent = `${randomMetrics.label} (Random Access)`
      randomLoad.textContent = randomMetrics.load
      mutationTitle.textContent = `${mutationMetrics.label} (Middle Insertion)`
      mutationLoad.textContent = mutationMetrics.load

      const [randomLeft, randomRight] = asWidthPair(randomMetrics.arrayMs, randomMetrics.linkedMs)
      randomArrayBar.style.width = `${randomLeft}%`
      randomLinkedBar.style.width = `${randomRight}%`
      randomArrayBar.textContent = `顺序表: ${randomMetrics.arrayMs}ms`
      randomLinkedBar.textContent = `链表: ${randomMetrics.linkedMs}ms`

      const [mutationLeft, mutationRight] = asWidthPair(mutationMetrics.arrayMs, mutationMetrics.linkedMs)
      mutationArrayBar.style.width = `${mutationLeft}%`
      mutationLinkedBar.style.width = `${mutationRight}%`
      mutationArrayBar.textContent = `顺序表: ${mutationMetrics.arrayMs}ms`
      mutationLinkedBar.textContent = `链表: ${mutationMetrics.linkedMs}ms`
    }

    const updateRandomMetric = (label, arrayMs, linkedMs, loadText) => {
      randomMetrics.label = label
      randomMetrics.arrayMs = Math.max(1, Math.round(arrayMs))
      randomMetrics.linkedMs = Math.max(1, Math.round(linkedMs))
      randomMetrics.load = loadText
      updateMetricBars()
    }

    const updateMutationMetric = (label, arrayMs, linkedMs, loadText) => {
      mutationMetrics.label = label
      mutationMetrics.arrayMs = Math.max(1, Math.round(arrayMs))
      mutationMetrics.linkedMs = Math.max(1, Math.round(linkedMs))
      mutationMetrics.load = loadText
      updateMetricBars()
    }

    const makeNextStudentId = () => {
      const maxId = students
        .map((item) => Number(item.id))
        .filter((num) => Number.isFinite(num))
        .reduce((acc, num) => Math.max(acc, num), 20230000)
      return String(maxId + 1)
    }

    const applyFilter = () => {
      const keyword = clean(searchKeyword).toLowerCase()
      if (!keyword) {
        filteredStudents = students.map((item) => ({ ...item }))
        return
      }

      filteredStudents = students
        .filter((item) => `${item.id} ${item.name} ${item.className}`.toLowerCase().includes(keyword))
        .map((item) => ({ ...item }))
    }

    const renderArray = () => {
      arrayGrid.innerHTML = ''

      for (let index = 0; index < ARRAY_CAPACITY; index += 1) {
        const student = students[index]
        const addr = `0x${String(index + 1).padStart(3, '0')}`

        if (!student) {
          const slot = document.createElement('button')
          slot.type = 'button'
          slot.className =
            'aspect-square border-dashed border-2 border-primary/20 rounded-lg flex flex-col items-center justify-center relative bg-transparent opacity-50'
          slot.dataset.arrayCell = String(index)
          slot.innerHTML = `
            <span class="text-[10px] absolute top-1 left-2 font-mono text-slate-500">${addr}</span>
            <span class="text-xs text-slate-500">空闲</span>
          `
          arrayGrid.appendChild(slot)
          continue
        }

        const active = student.id === highlightedId
        const slot = document.createElement('button')
        slot.type = 'button'
        slot.className = `aspect-square rounded-lg flex flex-col items-center justify-center relative border transition-all ${
          active
            ? 'bg-primary/35 border-primary shadow-[0_0_20px_rgba(48,103,255,0.4)]'
            : 'bg-primary/20 border-primary/40 hover:bg-primary/30'
        }`
        slot.dataset.arrayCell = String(index)
        slot.dataset.studentId = student.id
        slot.innerHTML = `
          <span class="text-[10px] absolute top-1 left-2 font-mono text-primary-fixed opacity-60">${addr}</span>
          <span class="text-xs font-bold text-white">${escapeHtml(student.name)}</span>
          <span class="text-[10px] text-on-surface-variant">学号: ${escapeHtml(student.id)}</span>
        `
        arrayGrid.appendChild(slot)
      }
    }

    const renderLinked = () => {
      linkedCanvas.innerHTML = ''

      const track = document.createElement('div')
      track.className = 'h-full flex items-center gap-2 overflow-x-auto pr-2 pb-2'

      if (students.length === 0) {
        const empty = document.createElement('div')
        empty.className =
          'h-full w-full rounded-xl border border-dashed border-secondary/30 flex items-center justify-center text-on-surface-variant text-sm'
        empty.textContent = '链表为空，等待插入节点'
        track.appendChild(empty)
        linkedCanvas.appendChild(track)
        return
      }

      students.forEach((student, index) => {
        const active = student.id === highlightedId
        const node = document.createElement('button')
        node.type = 'button'
        node.dataset.linkedNode = String(index)
        node.dataset.studentId = student.id
        node.className = `shrink-0 w-24 h-24 rounded-full border flex flex-col items-center justify-center text-center transition-all ${
          active
            ? 'bg-secondary/30 border-secondary shadow-[0_0_20px_rgba(107,253,106,0.35)]'
            : 'bg-secondary/10 border-secondary/40 hover:bg-secondary/20'
        }`
        node.innerHTML = `
          <span class="text-xs font-bold text-white">${escapeHtml(student.name)}</span>
          <span class="text-[10px] text-on-surface-variant">ptr: ${index === students.length - 1 ? 'NULL' : `0x${String(index + 2).padStart(3, '0')}`}</span>
        `
        track.appendChild(node)

        if (index < students.length - 1) {
          const arrow = document.createElement('span')
          arrow.className = 'material-symbols-outlined text-secondary shrink-0'
          arrow.textContent = 'arrow_right_alt'
          track.appendChild(arrow)
        }
      })

      linkedCanvas.appendChild(track)
    }

    const renderTable = () => {
      tbody.innerHTML = ''

      if (filteredStudents.length === 0) {
        const row = document.createElement('tr')
        row.innerHTML = `
          <td colspan="5" class="px-6 py-8 text-center text-on-surface-variant">
            没有匹配结果，请调整搜索条件。
          </td>
        `
        tbody.appendChild(row)
      } else {
        filteredStudents.forEach((student) => {
          const active = student.id === highlightedId
          const row = document.createElement('tr')
          row.className = `hover:bg-white/5 transition-colors group ${active ? 'bg-primary/5' : ''}`
          row.dataset.studentId = student.id
          row.innerHTML = `
            <td class="px-6 py-4 font-mono text-primary">${escapeHtml(student.id)}</td>
            <td class="px-6 py-4 text-white">${escapeHtml(student.name)}</td>
            <td class="px-6 py-4">${escapeHtml(student.className)}</td>
            <td class="px-6 py-4"><span class="${statusBadge(student.status)}">${escapeHtml(student.status)}</span></td>
            <td class="px-6 py-4 text-right">
              <button data-action="edit" data-id="${escapeHtml(student.id)}" class="text-slate-500 hover:text-white transition-colors mr-3">
                <span class="material-symbols-outlined text-sm pointer-events-none">edit</span>
              </button>
              <button data-action="delete" data-id="${escapeHtml(student.id)}" class="text-slate-500 hover:text-error transition-colors">
                <span class="material-symbols-outlined text-sm pointer-events-none">delete</span>
              </button>
            </td>
          `
          tbody.appendChild(row)
        })
      }

      totalChip.textContent = `总计: ${students.length}`

      if (!searchKeyword) {
        cacheChip.textContent = '缓存: 暖机'
      } else {
        cacheChip.textContent = filteredStudents.length > 0 ? '缓存: 命中' : '缓存: 未命中'
      }
    }

    const renderAll = () => {
      applyFilter()
      renderArray()
      renderLinked()
      renderTable()
      updateMetricBars()
    }

    const accessStudentAt = (index, from) => {
      if (index < 0 || index >= students.length) {
        appendLog(`访问索引 ${index} 失败：越界。`, 'error')
        return
      }

      const student = students[index]
      highlightedId = student.id
      const arrayMs = 1 + (index % 3)
      const linkedMs = 6 + index * 4
      updateRandomMetric('随机访问', arrayMs, linkedMs, `负载: 索引 ${index}`)
      renderAll()
      appendLog(`${from}：访问学号 ${student.id} -> 顺序表 ${arrayMs}ms，链表 ${linkedMs}ms。`, 'primary')
    }

    const simulateMiddleInsertOnly = () => {
      const index = Math.floor(students.length / 2)
      const arrayMs = 12 + Math.max(0, students.length - index) * 5
      const linkedMs = 4 + index * 2
      updateMutationMetric('中间插入模拟', arrayMs, linkedMs, `负载: ${students.length} 个元素`)
      appendLog(`插入模拟：位置 ${index}，顺序表 ${arrayMs}ms，链表 ${linkedMs}ms。`, 'secondary')
    }

    const simulateSearch = () => {
      const target = students[Math.floor(students.length / 2)]
      if (!target) {
        appendLog('查找模拟失败：当前没有学生数据。', 'error')
        return
      }

      highlightedId = target.id
      const scanned = Math.ceil(students.length / 2)
      const arrayMs = 3 + scanned * 2
      const linkedMs = 4 + scanned * 3
      updateRandomMetric('顺序查找', arrayMs, linkedMs, `负载: 扫描 ${scanned} 节点`)
      renderAll()
      appendLog(`查找模拟：命中 ${target.id}，顺序表 ${arrayMs}ms，链表 ${linkedMs}ms。`, 'tertiary')
    }

    const setAddMode = () => {
      formMode = 'add'
      editingId = ''
      idInput.value = makeNextStudentId()
      idInput.disabled = false
      nameInput.value = ''
      classInput.value = ''
      statusInput.value = '在校'
      indexInput.disabled = false
      indexInput.value = String(students.length)
      saveButton.textContent = '新增并对比'
      formTip.textContent = '新增模式：可指定插入位置并观察顺序表/链表差异。'
    }

    const setEditMode = (student) => {
      formMode = 'edit'
      editingId = student.id
      idInput.value = student.id
      idInput.disabled = true
      nameInput.value = student.name
      classInput.value = student.className
      statusInput.value = student.status
      indexInput.disabled = true
      indexInput.value = String(students.findIndex((item) => item.id === student.id))
      saveButton.textContent = '保存修改'
      formTip.textContent = '编辑模式：更新学生属性，结构移动成本极低。'
    }

    const handleSave = () => {
      const id = clean(idInput.value)
      const name = clean(nameInput.value)
      const className = clean(classInput.value)
      const status = clean(statusInput.value) || '在校'
      const indexRaw = Number(indexInput.value)

      if (!id || !name || !className) {
        appendLog('保存失败：学号、姓名、班级为必填项。', 'error')
        return
      }

      if (formMode === 'add' && students.some((item) => item.id === id)) {
        appendLog(`保存失败：学号 ${id} 已存在。`, 'error')
        return
      }

      if (formMode === 'edit') {
        const target = students.find((item) => item.id === editingId)
        if (!target) {
          appendLog('保存失败：未找到要编辑的学生。', 'error')
          return
        }

        target.name = name
        target.className = className
        target.status = status
        highlightedId = target.id
        updateMutationMetric('属性更新', 2, 3, '负载: 轻')
        renderAll()
        appendLog(`已更新学生 ${target.id}。`, 'secondary')
        setAddMode()
        return
      }

      const insertIndex = clamp(Number.isFinite(indexRaw) ? Math.floor(indexRaw) : students.length, 0, students.length)
      const newStudent = { id, name, className, status }
      students.splice(insertIndex, 0, newStudent)
      highlightedId = id

      const arrayMs = 8 + Math.max(0, students.length - insertIndex) * 4
      const linkedMs = 4 + insertIndex * 2
      updateMutationMetric('中间插入', arrayMs, linkedMs, `负载: ${students.length} 个元素`)
      renderAll()
      appendLog(`新增学生 ${id} 于位置 ${insertIndex}，顺序表 ${arrayMs}ms，链表 ${linkedMs}ms。`, 'secondary')

      if (students.length > ARRAY_CAPACITY) {
        appendLog(`顺序表容量提示：当前 ${students.length}/${ARRAY_CAPACITY}，后续节点仅在链表完整展示。`, 'error')
      }

      setAddMode()
    }

    const handleDelete = (id) => {
      const index = students.findIndex((item) => item.id === id)
      if (index < 0) {
        appendLog(`删除失败：未找到学号 ${id}。`, 'error')
        return
      }

      const [removed] = students.splice(index, 1)
      const arrayMs = 7 + Math.max(0, students.length - index) * 3
      const linkedMs = 4 + index * 2
      updateMutationMetric('中间删除', arrayMs, linkedMs, `负载: ${students.length} 个元素`)
      highlightedId = students[index]?.id || students[students.length - 1]?.id || ''
      renderAll()
      appendLog(`删除学生 ${removed.id}，顺序表 ${arrayMs}ms，链表 ${linkedMs}ms。`, 'error')
    }

    addButton.addEventListener('click', () => {
      setAddMode()
      nameInput.focus()
      appendLog('进入新增模式。', 'neutral')
    })

    resetButton.addEventListener('click', () => {
      students = initialStudents.map((item) => ({ ...item }))
      searchKeyword = ''
      searchInput.value = ''
      highlightedId = ''
      randomMetrics.label = '随机访问'
      randomMetrics.load = '负载: 低'
      randomMetrics.arrayMs = 2
      randomMetrics.linkedMs = 142
      mutationMetrics.label = '中间插入'
      mutationMetrics.load = '负载: 3 个元素'
      mutationMetrics.arrayMs = 88
      mutationMetrics.linkedMs = 4
      setAddMode()
      loggerBox.innerHTML = ''
      renderAll()
      appendLog('系统已重置，恢复到初始数据。', 'neutral')
    })

    searchInput.addEventListener('input', () => {
      searchKeyword = searchInput.value
      applyFilter()
      renderTable()
      const scanned = students.length
      const arrayMs = 2 + scanned * 1.8
      const linkedMs = 3 + scanned * 2.2
      updateRandomMetric('关键字检索', arrayMs, linkedMs, `负载: ${scanned} 条记录`)
    })

    saveButton.addEventListener('click', handleSave)
    cancelButton.addEventListener('click', setAddMode)

    accessDemoButton.addEventListener('click', () => {
      if (students.length === 0) {
        appendLog('随机访问测试失败：暂无学生数据。', 'error')
        return
      }

      const index = Math.floor(Math.random() * students.length)
      accessStudentAt(index, '随机访问测试')
    })

    insertDemoButton.addEventListener('click', simulateMiddleInsertOnly)
    searchDemoButton.addEventListener('click', simulateSearch)

    arrayGrid.addEventListener('click', (event) => {
      const clickTarget = event.target
      if (!(clickTarget instanceof Element)) return
      const target = clickTarget.closest('[data-array-cell]')
      if (!target) return
      const index = Number(target.dataset.arrayCell)
      accessStudentAt(index, '顺序表访问')
    })

    linkedCanvas.addEventListener('click', (event) => {
      const clickTarget = event.target
      if (!(clickTarget instanceof Element)) return
      const target = clickTarget.closest('[data-linked-node]')
      if (!target) return
      const index = Number(target.dataset.linkedNode)
      accessStudentAt(index, '链表遍历')
    })

    tbody.addEventListener('click', (event) => {
      const clickTarget = event.target
      if (!(clickTarget instanceof Element)) return
      const actionButton = clickTarget.closest('button[data-action]')
      if (actionButton) {
        const action = actionButton.dataset.action
        const id = actionButton.dataset.id
        if (!id) return

        if (action === 'edit') {
          const student = students.find((item) => item.id === id)
          if (!student) return
          setEditMode(student)
          highlightedId = student.id
          renderAll()
          appendLog(`进入编辑模式：${student.id}。`, 'tertiary')
          return
        }

        if (action === 'delete') {
          handleDelete(id)
          return
        }
      }

      const row = clickTarget.closest('tr[data-student-id]')
      if (!row) return
      const id = row.dataset.studentId
      const index = students.findIndex((item) => item.id === id)
      if (index >= 0) {
        accessStudentAt(index, '表格定位')
      }
    })

    setAddMode()
    renderAll()
    appendLog('学生信息管理系统已就绪，可执行新增/编辑/删除/查找与结构对比。', 'neutral')
  }

  const wireBstPage = () => {
    if (pageName !== 'bst.html' || document.body.dataset.codexBstPageBound === 'true') {
      return
    }

    document.body.dataset.codexBstPageBound = 'true'

    const topNavLinks = Array.from(document.querySelectorAll('header nav a'))
    const topNavTargets = ['/', '/learning-path', '/practice', '/docs']
    topNavLinks.forEach((node, index) => {
      const href = topNavTargets[index]
      if (!href) return
      node.setAttribute('href', href)
      node.setAttribute('target', '_top')
    })

    const breadcrumb = document.querySelector('main section nav')
    if (breadcrumb) {
      const parts = Array.from(breadcrumb.children)
      const home = parts[0]
      const tree = parts[2]
      if (home) {
        home.style.cursor = 'pointer'
        home.addEventListener('click', () => navigateTop('/'))
      }
      if (tree) {
        tree.style.cursor = 'pointer'
        tree.addEventListener('click', () => navigateTop('/topic/tree'))
      }
    }

    const canvas = document.querySelector('main .relative.flex-grow.min-h-\\[500px\\].glass-panel')
    const controlBar = document.querySelector('main .glass-panel.p-6.rounded-xl.flex.items-center.justify-between')
    const logList = document.querySelector('main .flex-\\[2\\] .p-5.flex-grow.space-y-4')
    const codePanel = document.querySelector('main .flex-\\[3\\] pre')

    if (!canvas || !controlBar || !logList || !codePanel) {
      return
    }

    const playbackWrap = controlBar.querySelector('.flex.items-center.gap-1')
    const playbackButtons = playbackWrap ? Array.from(playbackWrap.querySelectorAll('button')) : []
    const prevButton = playbackButtons[0]
    const playButton = playbackButtons[1]
    const nextButton = playbackButtons[2]
    const resetPlaybackButton = playbackButtons[3]
    const speedSlider = controlBar.querySelector('input[type="range"]')

    const rightControl = Array.from(controlBar.children).find((node) =>
      node.classList.contains('gap-3'),
    )
    const inputGroup = rightControl?.querySelector('.flex.bg-surface-container-lowest')
    const valueInput = inputGroup?.querySelector('input[type="number"]')
    const insertButton = inputGroup?.querySelector('button')
    const rightButtons = rightControl ? Array.from(rightControl.children).filter((node) => node.tagName === 'BUTTON') : []
    const deleteButton = rightButtons[0]
    const searchButton = rightButtons[1]

    if (
      !prevButton ||
      !playButton ||
      !nextButton ||
      !resetPlaybackButton ||
      !speedSlider ||
      !valueInput ||
      !insertButton ||
      !deleteButton ||
      !searchButton
    ) {
      return
    }

    speedSlider.min = '0.5'
    speedSlider.max = '2'
    speedSlider.step = '0.25'
    speedSlider.value = '1'

    canvas.innerHTML = `
      <svg data-bst-edges class="absolute inset-0 w-full h-full pointer-events-none"></svg>
      <div data-bst-nodes class="absolute inset-0"></div>
      <div data-bst-search class="absolute top-4 right-4 bg-tertiary-container/20 border border-tertiary px-3 py-1.5 rounded-lg flex items-center gap-2">
        <span data-bst-search-label class="text-tertiary text-xs font-bold uppercase tracking-widest">当前目标</span>
        <span data-bst-search-value class="text-white font-headline text-lg">-</span>
      </div>
      <div class="absolute bottom-4 left-4 flex flex-col gap-2">
        <div class="glass-panel px-3 py-2 rounded-lg border border-white/5 flex items-center gap-3">
          <span class="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">树高度</span>
          <span data-bst-height class="text-primary font-headline font-bold">0</span>
        </div>
        <div class="glass-panel px-3 py-2 rounded-lg border border-white/5 flex items-center gap-3">
          <span class="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest">比较路径</span>
          <span data-bst-path class="text-secondary font-headline font-bold text-xs">-</span>
        </div>
      </div>
    `

    const edgeLayer = canvas.querySelector('[data-bst-edges]')
    const nodeLayer = canvas.querySelector('[data-bst-nodes]')
    const searchLabelNode = canvas.querySelector('[data-bst-search-label]')
    const searchValueNode = canvas.querySelector('[data-bst-search-value]')
    const heightNode = canvas.querySelector('[data-bst-height]')
    const pathNode = canvas.querySelector('[data-bst-path]')

    if (!edgeLayer || !nodeLayer || !searchLabelNode || !searchValueNode || !heightNode || !pathNode) {
      return
    }

    let nodeSeq = 0
    const createNode = (val) => ({ id: ++nodeSeq, val, left: null, right: null })

    const escapeHtml = (value) =>
      String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;')

    const now = () => {
      const d = new Date()
      const pad = (n) => String(n).padStart(2, '0')
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }

    const appendLog = (message, tone = 'neutral') => {
      const colors = {
        neutral: 'text-on-surface-variant',
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        error: 'text-error',
      }
      const row = document.createElement('div')
      row.className = `flex gap-3 ${colors[tone] || colors.neutral}`
      row.innerHTML = `
        <span class="text-[10px] opacity-50 mt-1">${now()}</span>
        <p>${escapeHtml(message)}</p>
      `
      logList.appendChild(row)
      while (logList.children.length > 30) {
        logList.removeChild(logList.firstChild)
      }
      logList.scrollTop = logList.scrollHeight
    }

    const treeHeight = (node) => {
      if (!node) return 0
      return 1 + Math.max(treeHeight(node.left), treeHeight(node.right))
    }

    const layoutMap = new Map()
    const layoutTree = (node, depth, left, right) => {
      if (!node) return
      const x = (left + right) / 2
      const y = 14 + depth * 20
      layoutMap.set(node.id, { x, y, depth })
      layoutTree(node.left, depth + 1, left, x)
      layoutTree(node.right, depth + 1, x, right)
    }

    const findPath = (root, target) => {
      const path = []
      let current = root
      while (current) {
        path.push(current.val)
        if (target === current.val) {
          return { found: true, path }
        }
        current = target < current.val ? current.left : current.right
      }
      return { found: false, path }
    }

    const insertIntoTree = (root, value) => {
      if (!root) {
        return { root: createNode(value), inserted: true, path: [value], duplicate: false }
      }

      const path = []
      let current = root
      let parent = null

      while (current) {
        path.push(current.val)
        if (value === current.val) {
          return { root, inserted: false, path, duplicate: true }
        }
        parent = current
        current = value < current.val ? current.left : current.right
      }

      const node = createNode(value)
      if (value < parent.val) parent.left = node
      else parent.right = node
      path.push(value)
      return { root, inserted: true, path, duplicate: false }
    }

    const deleteFromTree = (root, value) => {
      const path = []
      let parent = null
      let current = root

      while (current && current.val !== value) {
        path.push(current.val)
        parent = current
        current = value < current.val ? current.left : current.right
      }

      if (!current) {
        return { root, deleted: false, path, finalPath: path }
      }

      path.push(current.val)

      if (current.left && current.right) {
        let succParent = current
        let succ = current.right
        while (succ.left) {
          path.push(succ.val)
          succParent = succ
          succ = succ.left
        }
        current.val = succ.val
        if (succParent.left === succ) succParent.left = succ.right
        else succParent.right = succ.right
      } else {
        const child = current.left || current.right
        if (!parent) root = child
        else if (parent.left === current) parent.left = child
        else parent.right = child
      }

      return { root, deleted: true, path, finalPath: path }
    }

    let root = null
    let playbackFrames = []
    let playbackIndex = -1
    let comparePath = []
    let currentFocus = null
    let currentTarget = null
    let currentMode = 'idle'
    let playbackTimer = null
    let speed = 1

    const setCodeMode = (mode) => {
      const rows = Array.from(codePanel.querySelectorAll('span'))
      for (const row of rows) {
        if (!row.className.includes('bg-')) continue
        row.style.opacity = mode === 'search' ? '1' : '0.45'
      }
    }

    const drawTree = () => {
      layoutMap.clear()
      layoutTree(root, 0, 8, 92)
      edgeLayer.innerHTML = ''
      nodeLayer.innerHTML = ''

      const drawEdges = (node) => {
        if (!node) return
        const from = layoutMap.get(node.id)
        if (!from) return

        if (node.left) {
          const to = layoutMap.get(node.left.id)
          if (to) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute('x1', `${from.x}%`)
            line.setAttribute('y1', `${from.y}%`)
            line.setAttribute('x2', `${to.x}%`)
            line.setAttribute('y2', `${to.y}%`)
            line.setAttribute('stroke', 'rgba(147,170,255,0.25)')
            line.setAttribute('stroke-width', '2')
            edgeLayer.appendChild(line)
          }
        }

        if (node.right) {
          const to = layoutMap.get(node.right.id)
          if (to) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
            line.setAttribute('x1', `${from.x}%`)
            line.setAttribute('y1', `${from.y}%`)
            line.setAttribute('x2', `${to.x}%`)
            line.setAttribute('y2', `${to.y}%`)
            line.setAttribute('stroke', 'rgba(147,170,255,0.25)')
            line.setAttribute('stroke-width', '2')
            edgeLayer.appendChild(line)
          }
        }

        drawEdges(node.left)
        drawEdges(node.right)
      }

      const drawNodes = (node) => {
        if (!node) return
        const pos = layoutMap.get(node.id)
        if (!pos) return

        const inPath = comparePath.includes(node.val)
        const isFocus = node.val === currentFocus
        const nodeDiv = document.createElement('div')
        nodeDiv.className = `absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-headline font-bold border transition-all ${
          isFocus
            ? 'w-14 h-14 bg-secondary-container/30 border-2 border-secondary text-secondary node-glow'
            : inPath
              ? 'w-13 h-13 bg-primary/20 border border-primary text-primary'
              : 'w-12 h-12 bg-surface-container-high border border-outline-variant text-white'
        }`
        nodeDiv.style.left = `${pos.x}%`
        nodeDiv.style.top = `${pos.y}%`
        nodeDiv.textContent = String(node.val)
        nodeLayer.appendChild(nodeDiv)

        drawNodes(node.left)
        drawNodes(node.right)
      }

      if (root) {
        drawEdges(root)
        drawNodes(root)
      }
    }

    const updateStats = () => {
      heightNode.textContent = String(treeHeight(root))
      pathNode.textContent = comparePath.length > 0 ? comparePath.join(' -> ') : '-'
      searchValueNode.textContent = currentTarget ?? '-'

      if (currentMode === 'search') {
        searchLabelNode.textContent = '正在查找'
      } else if (currentMode === 'insert') {
        searchLabelNode.textContent = '正在插入'
      } else if (currentMode === 'delete') {
        searchLabelNode.textContent = '正在删除'
      } else {
        searchLabelNode.textContent = '当前目标'
      }
    }

    const renderAll = () => {
      drawTree()
      updateStats()
      setCodeMode(currentMode)
    }

    const stopPlayback = () => {
      if (!playbackTimer) return
      window.clearInterval(playbackTimer)
      playbackTimer = null
      const icon = playButton.querySelector('.material-symbols-outlined')
      if (icon) icon.textContent = 'play_arrow'
    }

    const applyFrame = () => {
      const frame = playbackFrames[playbackIndex]
      if (!frame) {
        comparePath = []
        currentFocus = null
        renderAll()
        return
      }
      comparePath = [...frame.path]
      currentFocus = frame.focus
      renderAll()
    }

    const stepNext = () => {
      if (playbackFrames.length === 0) return
      playbackIndex = clamp(playbackIndex + 1, 0, playbackFrames.length - 1)
      applyFrame()
      if (playbackIndex >= playbackFrames.length - 1) {
        stopPlayback()
      }
    }

    const stepPrev = () => {
      if (playbackFrames.length === 0) return
      playbackIndex = clamp(playbackIndex - 1, 0, playbackFrames.length - 1)
      applyFrame()
    }

    const startPlayback = () => {
      if (playbackFrames.length === 0) {
        appendLog('暂无可回放路径，请先执行查找/插入/删除操作。', 'error')
        return
      }

      if (playbackTimer) {
        stopPlayback()
        appendLog('已暂停路径回放。', 'tertiary')
        return
      }

      const icon = playButton.querySelector('.material-symbols-outlined')
      if (icon) icon.textContent = 'pause'

      if (playbackIndex >= playbackFrames.length - 1) {
        playbackIndex = -1
      }

      const interval = Math.max(150, Math.round(850 / speed))
      playbackTimer = window.setInterval(() => {
        stepNext()
      }, interval)
      appendLog(`开始回放，速度 ${speed.toFixed(2)}x。`, 'tertiary')
    }

    const setFramesFromPath = (path, detail) => {
      playbackFrames = path.map((value, index) => ({
        focus: value,
        path: path.slice(0, index + 1),
      }))
      playbackIndex = playbackFrames.length > 0 ? 0 : -1
      applyFrame()
      appendLog(detail, 'primary')
    }

    const readInputValue = () => {
      const raw = clean(valueInput.value || '')
      if (!raw) return null
      const val = Number(raw)
      if (!Number.isFinite(val)) return null
      return Math.trunc(val)
    }

    const resetTree = (withLog = true) => {
      stopPlayback()
      root = null
      nodeSeq = 0
      const initial = [50, 30, 70, 20, 40]
      for (const val of initial) {
        root = insertIntoTree(root, val).root
      }
      currentMode = 'idle'
      currentTarget = null
      comparePath = []
      currentFocus = null
      playbackFrames = []
      playbackIndex = -1
      renderAll()
      if (withLog) appendLog('BST 已重置为默认结构：50, 30, 70, 20, 40。', 'neutral')
    }

    insertButton.addEventListener('click', () => {
      const val = readInputValue()
      if (val == null) {
        appendLog('插入失败：请输入有效整数。', 'error')
        return
      }

      currentMode = 'insert'
      currentTarget = val
      const result = insertIntoTree(root, val)
      root = result.root
      setFramesFromPath(result.path, result.duplicate ? `插入 ${val} 失败：节点已存在。` : `插入 ${val} 完成。`)
      if (result.duplicate) {
        appendLog(`节点 ${val} 已存在，保持原结构。`, 'error')
      } else {
        appendLog(`节点 ${val} 已按 BST 规则落位。`, 'secondary')
      }
      renderAll()
    })

    deleteButton.addEventListener('click', () => {
      const val = readInputValue()
      if (val == null) {
        appendLog('删除失败：请输入有效整数。', 'error')
        return
      }

      currentMode = 'delete'
      currentTarget = val
      const result = deleteFromTree(root, val)
      root = result.root
      setFramesFromPath(result.finalPath, result.deleted ? `删除 ${val} 完成。` : `删除 ${val} 失败：未找到节点。`)
      if (result.deleted) {
        appendLog(`节点 ${val} 已删除并重连子树。`, 'secondary')
      } else {
        appendLog(`节点 ${val} 不存在，删除操作取消。`, 'error')
      }
      renderAll()
    })

    searchButton.addEventListener('click', () => {
      const val = readInputValue()
      if (val == null) {
        appendLog('查找失败：请输入有效整数。', 'error')
        return
      }

      currentMode = 'search'
      currentTarget = val
      const result = findPath(root, val)
      setFramesFromPath(result.path, `开始查找 ${val}，比较节点 ${Math.max(1, result.path.length)} 次。`)
      if (result.found) {
        appendLog(`查找命中：${val}。`, 'secondary')
      } else {
        appendLog(`查找结束：${val} 不在树中。`, 'error')
      }
      renderAll()
    })

    prevButton.addEventListener('click', () => {
      stopPlayback()
      stepPrev()
    })

    nextButton.addEventListener('click', () => {
      stopPlayback()
      stepNext()
    })

    playButton.addEventListener('click', startPlayback)
    resetPlaybackButton.addEventListener('click', () => {
      stopPlayback()
      playbackIndex = playbackFrames.length > 0 ? 0 : -1
      applyFrame()
      appendLog('已重置路径回放指针。', 'tertiary')
    })

    speedSlider.addEventListener('input', () => {
      speed = clamp(Number(speedSlider.value) || 1, 0.5, 2)
      appendLog(`回放速度调整为 ${speed.toFixed(2)}x。`, 'tertiary')
      if (playbackTimer) {
        stopPlayback()
      }
    })

    const canvasResetButton = document.querySelector('section.px-8 .px-6.py-2\\.5.bg-gradient-to-r')
    canvasResetButton?.addEventListener('click', () => {
      resetTree()
    })

    resetTree(false)
    appendLog('BST 模拟器已就绪：支持插入、删除、查找与路径回放。', 'neutral')
  }

  const wireHanoiPage = () => {
    if (pageName !== 'hanoi.html' || document.body.dataset.codexHanoiPageBound === 'true') {
      return
    }

    document.body.dataset.codexHanoiPageBound = 'true'

    const topNavLinks = Array.from(document.querySelectorAll('header nav a'))
    const topNavTargets = ['/', '/learning-path', '/practice', '/docs']
    topNavLinks.forEach((node, index) => {
      const href = topNavTargets[index]
      if (!href) return
      node.setAttribute('href', href)
      node.setAttribute('target', '_top')
    })

    const breadcrumbLinks = Array.from(document.querySelectorAll('nav[aria-label="Breadcrumb"] a'))
    if (breadcrumbLinks[0]) {
      breadcrumbLinks[0].setAttribute('href', '/')
      breadcrumbLinks[0].setAttribute('target', '_top')
    }
    if (breadcrumbLinks[1]) {
      breadcrumbLinks[1].setAttribute('href', '/topic/integrated')
      breadcrumbLinks[1].setAttribute('target', '_top')
    }

    const mainGrid = document.querySelector('main .grid.grid-cols-12.gap-8')
    const sideColumns = mainGrid
      ? Array.from(mainGrid.querySelectorAll(':scope > .col-span-12.lg\\:col-span-3'))
      : []

    const leftColumn = sideColumns[0] || document.querySelector('.col-span-12.lg\\:col-span-3.space-y-8')
    const rightColumn = sideColumns[1] || null
    const leftSections = leftColumn ? Array.from(leftColumn.querySelectorAll('section.glass-panel')) : []
    const statsSection = leftSections[0]
    const controlSection = leftSections[1]

    const statValueNodes = statsSection ? Array.from(statsSection.querySelectorAll('.text-3xl.font-headline.font-bold')) : []
    const currentStepNode = statValueNodes[0]
    const theoreticalStepNode = statValueNodes[1]
    const depthBars = statsSection?.querySelector('.flex.items-end.gap-1.h-12')
    const depthLabel = statsSection ? Array.from(statsSection.querySelectorAll('p')).find((node) => node.className.includes('text-primary')) : null

    const ranges = controlSection ? Array.from(controlSection.querySelectorAll('input[type="range"]')) : []
    const diskRange = ranges[0]
    const speedRange = ranges[1]
    const rangeValueNodes = controlSection ? Array.from(controlSection.querySelectorAll('.flex.justify-between.mb-4 span')) : []
    const diskValueNode = rangeValueNodes[0]
    const speedValueNode = rangeValueNodes[1]
    const controlButtons = controlSection ? Array.from(controlSection.querySelectorAll('button')) : []
    const autoButton = controlButtons[0]
    const pauseButton = controlButtons[1]
    const stepButton = controlButtons[2]
    const resetButton = controlButtons[3]

    const sideNavLinks = Array.from(document.querySelectorAll('aside nav a'))
    const sideStepLink = sideNavLinks[1]
    const sideAutoLink = sideNavLinks[2]
    const sideResetLink = sideNavLinks[3]
    const newSimulationButton = document.querySelector('aside button')

    const centerColumn =
      mainGrid?.querySelector(':scope > .col-span-12.lg\\:col-span-6') ||
      document.querySelector('.col-span-12.lg\\:col-span-6')
    const stage =
      centerColumn?.querySelector('.relative.w-full.aspect-video') ||
      document.querySelector('.relative.w-full.aspect-video')
    const pillarNodes = stage ? Array.from(stage.querySelectorAll(':scope > .relative.flex.flex-col.items-center.group')) : []
    const towerNames = ['A', 'B', 'C']
    const towerLabels = ['起始柱 A', '辅助柱 B', '目标柱 C']
    const diskContainers = pillarNodes.map((node) => node.querySelector('.absolute.bottom-3'))
    const pillarNameNodes = pillarNodes.map((node) => node.querySelector('.absolute.-bottom-8'))
    const statusBadge = centerColumn?.querySelector('.absolute.bottom-8 .px-4.py-2.rounded-full')

    const codePanels = Array.from(document.querySelectorAll('.col-span-12.lg\\:col-span-3 section.glass-panel'))
    const codePanel =
      rightColumn?.querySelector('section.glass-panel') ||
      codePanels.find((panel) => panel.querySelector('.flex-1.p-4.font-mono')) ||
      null
    const codeArea = codePanel?.querySelector('.flex-1.p-4.font-mono')
    const callStackContainer = codePanel?.querySelector('.mt-8.pt-6 .space-y-2')
    const codeHighlightLine = codePanel?.querySelector('.code-highlight')

    if (
      !statsSection ||
      !controlSection ||
      !currentStepNode ||
      !theoreticalStepNode ||
      !depthBars ||
      !depthLabel ||
      !diskRange ||
      !speedRange ||
      !diskValueNode ||
      !speedValueNode ||
      !autoButton ||
      !pauseButton ||
      !stepButton ||
      !resetButton ||
      !stage ||
      pillarNodes.length < 3 ||
      diskContainers.some((node) => !node) ||
      pillarNameNodes.some((node) => !node) ||
      !statusBadge ||
      !codeArea ||
      !callStackContainer ||
      !codeHighlightLine
    ) {
      return
    }

    const logWrap = document.createElement('div')
    logWrap.className = 'mt-6 pt-4 border-t border-slate-800/50'
    logWrap.innerHTML = `
      <h4 class="text-[10px] text-slate-500 uppercase font-headline mb-3">运行日志</h4>
      <div data-hanoi-log class="space-y-1 max-h-32 overflow-y-auto pr-1 text-[10px] font-mono"></div>
    `
    codeArea.appendChild(logWrap)

    const logBox = logWrap.querySelector('[data-hanoi-log]')
    if (!logBox) {
      return
    }

    const clamp = (num, min, max) => Math.max(min, Math.min(max, num))
    const now = () => {
      const d = new Date()
      const pad = (n) => String(n).padStart(2, '0')
      return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    }

    const appendLog = (message, tone = 'neutral') => {
      const toneClass = {
        neutral: 'text-slate-400',
        primary: 'text-primary',
        secondary: 'text-secondary',
        tertiary: 'text-tertiary',
        error: 'text-error',
      }

      const line = document.createElement('div')
      line.className = toneClass[tone] || toneClass.neutral
      line.textContent = `[${now()}] ${message}`
      logBox.appendChild(line)

      while (logBox.children.length > 48) {
        logBox.removeChild(logBox.firstChild)
      }

      logBox.scrollTop = logBox.scrollHeight
    }

    const theoryFor = (n) => 2 ** n - 1

    const buildMoves = (n) => {
      const moves = []
      const frames = []

      const solve = (count, from, helper, to) => {
        frames.push(`hanoi(${count}, '${from}', '${helper}', '${to}')`)
        if (count === 1) {
          moves.push({
            disk: 1,
            from,
            to,
            depth: frames.length,
            frames: [...frames],
          })
        } else {
          solve(count - 1, from, to, helper)
          moves.push({
            disk: count,
            from,
            to,
            depth: frames.length,
            frames: [...frames],
          })
          solve(count - 1, helper, from, to)
        }
        frames.pop()
      }

      solve(n, 'A', 'B', 'C')
      return moves
    }

    const initTowers = (n) => ({
      A: Array.from({ length: n }, (_, index) => n - index),
      B: [],
      C: [],
    })

    const getDiskWidth = (disk) => 34 + disk * 14
    const getDiskColor = (disk) => {
      const hue = (215 + disk * 21) % 360
      return `linear-gradient(90deg, hsl(${hue} 72% 42%), hsl(${(hue + 18) % 360} 78% 60%))`
    }

    let diskCount = clamp(Number(diskRange.value) || 4, 3, 10)
    let speed = clamp(Number(speedRange.value) || 1, 0.5, 2)
    let moves = buildMoves(diskCount)
    let towers = initTowers(diskCount)
    let moveIndex = 0
    let currentDepth = 0
    let activeMove = null
    let selectedTower = null
    let timerId = null

    const stopAuto = (reason, tone = 'neutral') => {
      if (!timerId) return
      window.clearInterval(timerId)
      timerId = null
      if (reason) {
        appendLog(reason, tone)
      }
      renderControls()
    }

    const setStatus = (text, tone = 'primary') => {
      statusBadge.classList.remove('text-primary', 'text-secondary', 'text-tertiary', 'text-error')
      statusBadge.classList.add(tone === 'secondary' ? 'text-secondary' : tone === 'tertiary' ? 'text-tertiary' : tone === 'error' ? 'text-error' : 'text-primary')
      statusBadge.textContent = text
    }

    const renderDepthBars = () => {
      depthBars.innerHTML = ''
      const levels = 10
      for (let level = 1; level <= levels; level += 1) {
        const bar = document.createElement('div')
        const ratio = level / levels
        const height = 12 + Math.round(ratio * 38)
        const active = level <= currentDepth
        bar.className = `w-1 rounded-t-full ${active ? 'bg-primary' : 'bg-slate-700'} ${active && level === currentDepth ? 'animate-pulse' : ''}`
        bar.style.height = `${height}px`
        depthBars.appendChild(bar)
      }
      depthLabel.textContent = currentDepth === 0 ? '深度 0 (等待执行)' : `深度 ${currentDepth} / ${diskCount}`
    }

    const renderCallStack = () => {
      callStackContainer.innerHTML = ''
      const frames = activeMove?.frames || [`hanoi(${diskCount}, 'A', 'B', 'C')`]
      const visible = [...frames].reverse().slice(0, 4)

      visible.forEach((frame, index) => {
        const row = document.createElement('div')
        if (index === 0 && activeMove) {
          row.className = 'bg-primary/5 p-3 rounded-lg border border-primary/10'
          row.innerHTML = `
            <p class="text-primary text-[10px] font-bold">${frame}</p>
            <p class="text-[9px] text-slate-500 mt-1">执行步骤 ${moveIndex}/${moves.length}</p>
          `
        } else {
          row.className = 'p-3 rounded-lg border border-slate-800 flex items-center justify-between'
          row.innerHTML = `
            <p class="text-slate-500 text-[10px]">${frame}</p>
            <span class="material-symbols-outlined text-slate-700 text-sm">history</span>
          `
        }
        callStackContainer.appendChild(row)
      })
    }

    const renderStats = () => {
      currentStepNode.innerHTML = `${moveIndex} <span class="text-xs text-slate-500 font-normal">步</span>`
      theoreticalStepNode.innerHTML = `${theoryFor(diskCount)} <span class="text-xs text-slate-500 font-normal">(2^n - 1)</span>`
      diskValueNode.textContent = String(diskCount)
      speedValueNode.textContent = `${speed.toFixed(1)}x`
      renderDepthBars()
      renderCallStack()
    }

    const renderControls = () => {
      const playing = Boolean(timerId)
      autoButton.disabled = playing || moveIndex >= moves.length
      stepButton.disabled = playing || moveIndex >= moves.length
      pauseButton.disabled = !playing

      const disabledClasses = ['opacity-50', 'cursor-not-allowed']
      ;[autoButton, stepButton, pauseButton].forEach((node) => {
        if (!node) return
        disabledClasses.forEach((klass) => node.classList.toggle(klass, node.disabled))
      })
    }

    const renderTowers = () => {
      towerNames.forEach((name, index) => {
        const pillarNode = pillarNodes[index]
        const labelNode = pillarNameNodes[index]
        const diskContainer = diskContainers[index]
        if (!labelNode || !diskContainer) return

        if (pillarNode) {
          const selected = selectedTower === name
          pillarNode.style.cursor = timerId ? 'not-allowed' : 'pointer'
          pillarNode.style.boxShadow = selected ? '0 0 0 2px rgba(147, 170, 255, 0.8), 0 0 20px rgba(147, 170, 255, 0.25)' : ''
          pillarNode.style.borderRadius = selected ? '10px' : ''
        }

        labelNode.textContent = towerLabels[index]
        labelNode.classList.toggle('text-primary', name === 'A')
        labelNode.classList.toggle('text-secondary', name === 'C' && moveIndex === moves.length)
        labelNode.classList.toggle('text-slate-600', !(name === 'A' || (name === 'C' && moveIndex === moves.length)))

        diskContainer.className = 'absolute bottom-3 flex flex-col-reverse items-center gap-0.5'
        diskContainer.innerHTML = ''

        const stack = towers[name]
        stack.forEach((disk) => {
          const diskNode = document.createElement('div')
          diskNode.className = 'hanoi-disk h-4 rounded-lg shadow-lg border-t border-white/10 text-[9px] font-headline font-bold text-white/90 flex items-center justify-center'
          diskNode.style.width = `${getDiskWidth(disk)}px`
          diskNode.style.background = getDiskColor(disk)
          diskNode.textContent = String(disk)
          diskContainer.appendChild(diskNode)
        })
      })
    }

    const applyMove = (move) => {
      const fromStack = towers[move.from]
      const toStack = towers[move.to]

      if (!fromStack || !toStack || fromStack.length === 0) {
        appendLog(`非法移动：柱 ${move.from} 无可移动圆盘。`, 'error')
        return false
      }

      const disk = fromStack[fromStack.length - 1]
      if (disk !== move.disk) {
        appendLog(`校验失败：期望盘 ${move.disk}，实际盘 ${disk}。`, 'error')
        return false
      }

      const targetTop = toStack[toStack.length - 1]
      if (targetTop && targetTop < disk) {
        appendLog(`非法移动：盘 ${disk} 不能放在盘 ${targetTop} 上。`, 'error')
        return false
      }

      fromStack.pop()
      toStack.push(disk)
      return true
    }

    const renderAll = () => {
      renderStats()
      renderTowers()
      renderControls()
      codeHighlightLine.classList.toggle('code-highlight', true)
    }

    const stepForward = (origin = '单步执行') => {
      if (moveIndex >= moves.length) {
        setStatus('已完成：全部移动已执行', 'secondary')
        appendLog('仿真已完成，无更多步骤。', 'neutral')
        renderControls()
        return
      }

      selectedTower = null
      const move = moves[moveIndex]
      const ok = applyMove(move)
      if (!ok) {
        stopAuto('自动播放已停止：出现非法状态。', 'error')
        return
      }

      moveIndex += 1
      currentDepth = move.depth
      activeMove = move

      const done = moveIndex >= moves.length
      if (done) {
        setStatus(`完成：第 ${moveIndex} 步，将盘 ${move.disk} 从 ${move.from} 移到 ${move.to}`, 'secondary')
      } else {
        setStatus(`执行中：第 ${moveIndex}/${moves.length} 步，盘 ${move.disk}: ${move.from} -> ${move.to}`, 'primary')
      }

      appendLog(`${origin}：第 ${moveIndex} 步，盘 ${move.disk} 从 ${move.from} -> ${move.to}。`, 'primary')
      renderAll()

      if (done) {
        stopAuto('自动播放结束：汉诺塔求解完成。', 'secondary')
      }
    }

    const startAuto = () => {
      if (timerId || moveIndex >= moves.length) {
        return
      }

      selectedTower = null
      setStatus('自动播放中...', 'tertiary')
      appendLog(`开始自动播放，速度 ${speed.toFixed(1)}x。`, 'tertiary')
      renderControls()

      const interval = Math.max(120, Math.round(850 / speed))
      timerId = window.setInterval(() => {
        stepForward('自动播放')
      }, interval)
      renderControls()
    }

    const resetSimulation = (nextDiskCount, withLog = true) => {
      stopAuto('', 'neutral')
      diskCount = clamp(nextDiskCount ?? diskCount, 3, 10)
      speed = clamp(Number(speedRange.value) || speed, 0.5, 2)
      moves = buildMoves(diskCount)
      towers = initTowers(diskCount)
      moveIndex = 0
      currentDepth = 0
      activeMove = null
      selectedTower = null
      diskRange.value = String(diskCount)
      speedRange.value = String(speed)
      setStatus(`准备就绪：${diskCount} 个圆盘，目标步数 ${moves.length}`, 'primary')
      renderAll()
      if (withLog) {
        appendLog(`已重置仿真：圆盘数 ${diskCount}，目标步数 ${moves.length}。`, 'neutral')
      }
    }

    autoButton.addEventListener('click', startAuto)
    pauseButton.addEventListener('click', () => stopAuto('已暂停自动播放。', 'tertiary'))
    stepButton.addEventListener('click', () => stepForward('单步执行'))
    resetButton.addEventListener('click', () => resetSimulation(diskCount))

    diskRange.addEventListener('input', () => {
      const value = clamp(Number(diskRange.value) || diskCount, 3, 10)
      diskValueNode.textContent = String(value)
      resetSimulation(value)
    })

    speedRange.addEventListener('input', () => {
      speed = clamp(Number(speedRange.value) || speed, 0.5, 2)
      speedValueNode.textContent = `${speed.toFixed(1)}x`
      appendLog(`速度已调整为 ${speed.toFixed(1)}x。`, 'tertiary')
      if (timerId) {
        stopAuto('已应用新速度，自动播放暂停。', 'tertiary')
      }
      renderControls()
    })

    const handlePillarSelection = (tower) => {
      if (timerId) {
        appendLog('请先暂停自动播放，再进行手动操作。', 'tertiary')
        return
      }

      if (moveIndex >= moves.length) {
        setStatus('已完成：可点击重置后重新体验。', 'secondary')
        appendLog('演示已完成，点击“重置仿真”可重新开始。', 'secondary')
        return
      }

      if (!selectedTower) {
        if (!towers[tower] || towers[tower].length === 0) {
          appendLog(`柱 ${tower} 没有可移动圆盘，请先选择有圆盘的柱。`, 'tertiary')
          return
        }
        selectedTower = tower
        const expected = moves[moveIndex]
        setStatus(`已选择 ${tower}。请点击目标柱（建议 ${expected.from} -> ${expected.to}）。`, 'tertiary')
        appendLog(`已选择源柱 ${tower}，请继续选择目标柱。`, 'tertiary')
        renderAll()
        return
      }

      if (selectedTower === tower) {
        selectedTower = null
        setStatus('已取消选择，请重新点击源柱。', 'tertiary')
        appendLog('已取消当前手动选择。', 'neutral')
        renderAll()
        return
      }

      const from = selectedTower
      const to = tower
      selectedTower = null

      const expected = moves[moveIndex]
      if (!expected) {
        renderAll()
        return
      }

      if (from !== expected.from || to !== expected.to) {
        setStatus(`当前应执行：盘 ${expected.disk}，${expected.from} -> ${expected.to}`, 'error')
        appendLog(`手动路径不匹配：你选择 ${from} -> ${to}，建议 ${expected.from} -> ${expected.to}。`, 'error')
        renderAll()
        return
      }

      stepForward('手动点击')
    }

    pillarNodes.forEach((node, index) => {
      if (!node || node.dataset.codexHanoiPillarBound === 'true') {
        return
      }
      node.dataset.codexHanoiPillarBound = 'true'
      const tower = towerNames[index]
      node.addEventListener('click', () => {
        if (!tower) return
        handlePillarSelection(tower)
      })
    })

    const bindActionLink = (node, action) => {
      if (!node) return
      node.setAttribute('href', '#')
      node.addEventListener('click', (event) => {
        event.preventDefault()
        action()
      })
    }

    bindActionLink(sideStepLink, () => stepForward('侧边单步'))
    bindActionLink(sideAutoLink, startAuto)
    bindActionLink(sideResetLink, () => resetSimulation(diskCount))

    if (newSimulationButton) {
      newSimulationButton.addEventListener('click', () => resetSimulation(diskCount))
    }

    resetSimulation(diskCount, false)
    appendLog('汉诺塔引擎就绪：支持自动、单步、暂停与重置。', 'neutral')
  }

  const boot = () => {
    rewriteByText()
    wireHomeCtas()
    wireFooterFallbacks()
    wireStackPage()
    wireStudentPage()
    wireBstPage()
    wireHanoiPage()
    markActiveNav()
    scrollHomeSections()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true })
  } else {
    boot()
  }

  window.addEventListener('codex:stitch-refresh', boot)
})()
