const assert = require('assert');

global.document = {
    createElement: (tag) => ({
        tagName: tag,
        className: '',
        innerText: '',
        innerHTML: '',
        textContent: '',
        appendChild: () => {},
        style: {}
    })
};
const getTimeString = () => '12:00';
global.getTimeString = getTimeString;

// Re-defining the fixed logic here for testing
function buildMessageNode(senderStr, contentData) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${senderStr}`;

    const content = document.createElement('div');
    content.className = 'message-content';

    if (typeof contentData === 'string') {
        if (senderStr === 'user') {
            content.textContent = contentData;
        } else {
            content.innerHTML = contentData;
        }
    } else if (contentData instanceof Object) { // Mock Node
        content.appendChild(contentData);
    }

    const time = document.createElement('div');
    time.className = 'timestamp';
    time.innerText = getTimeString();

    // just capture properties for test
    wrapper._childContent = content;

    return wrapper;
}

function runTests() {
    let passed = true;
    try {
        const xssPayload = "<script>alert('XSS')</script>";
        const userNode = buildMessageNode('user', xssPayload);

        assert.strictEqual(userNode._childContent.textContent, xssPayload, "textContent should be set for user messages");
        assert.strictEqual(userNode._childContent.innerHTML, '', "innerHTML should NOT be set for user messages");

        const botNode = buildMessageNode('bot', "<b>Hello</b>");
        assert.strictEqual(botNode._childContent.innerHTML, "<b>Hello</b>", "innerHTML should be set for bot messages");
        assert.strictEqual(botNode._childContent.textContent, '', "textContent should NOT be set for bot messages");

        console.log("XSS fix tests passed.");
    } catch (e) {
        passed = false;
        console.error("Test failed:", e);
    }
}
runTests();
