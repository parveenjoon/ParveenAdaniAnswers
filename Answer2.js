// Javascript function to find the longest substring where no character repeats more than twice
function longestSubstringWithMaxTwoRepeats(s) {
    let left = 0;// Initializing the left pointer for the sliding window
    
    let maxLength = 0;// to track the max length of the valid substring
    
    let maxSubstring = '';// for storing the longest valid substring found so far
    
    let charCount = new Map();// map to keep track of character frequencies within current window

    // Iterating through string with the right pointer
    for (let right = 0; right < s.length; right++) {
        let char = s[right];

        // Updating freq of the current char
        charCount.set(char, (charCount.get(char) || 0) + 1);

        // If any char appears more than twice, we will adjust left pointer to shrink the window
        while (charCount.get(char) > 2) {
            let leftChar = s[left];
            // Decreasing freq. of chars at left pointer
            charCount.set(leftChar, charCount.get(leftChar) - 1);
            // Moving left pointer to right to shrink the window
            left++;
        }

        // calculating current valid window length
        let currentLength = right - left + 1;

        // if current window is the largest valid one so far, then we will update the result
        if (currentLength > maxLength) {
            maxLength = currentLength;
            maxSubstring = s.slice(left, right + 1);
        }
    }

    // Returning longest valid substring & its length
    return { maxSubstring, maxLength };
}

// Checking with different test cases
console.log(longestSubstringWithMaxTwoRepeats("aaabbccddeeff")); 
console.log(longestSubstringWithMaxTwoRepeats("abcabcabc"));
console.log(longestSubstringWithMaxTwoRepeats("aabbaa")); 
