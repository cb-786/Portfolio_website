// Test script to verify API calls work

async function testLeetCode() {
  const gqlUrl = 'https://leetcode.com/graphql';
  const query = `
    query fullUserData($username: String!) {
      matchedUser(username: $username) {
        profile { ranking }
        submitStats {
          acSubmissionNum { difficulty count }
        }
      }
      userContestRanking(username: $username) { rating }
    }
  `;
  
  try {
    console.log('Testing LeetCode API...');
    const response = await fetch(gqlUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com'
      },
      body: JSON.stringify({ query, variables: { username: 'Chirag_bansal192005' } })
    });
    
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);
    
    if (data?.data?.matchedUser) {
      console.log('✓ LeetCode API is working!');
      console.log('Total:', data.data.matchedUser.submitStats.acSubmissionNum.find(s => s.difficulty === 'All')?.count);
    } else {
      console.log('✗ LeetCode API returned unexpected structure');
    }
  } catch (error) {
    console.error('✗ LeetCode API error:', error);
  }
}

async function testGitHub() {
  try {
    console.log('\nTesting GitHub API...');
    const response = await fetch('https://github-contributions-api.deno.dev/cb-786.json');
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response keys:', Object.keys(data));
    if (data.contributions) {
      console.log('✓ GitHub API is working!');
      console.log('Contributions count:', data.contributions?.length);
    } else {
      console.log('✗ GitHub API returned unexpected structure');
    }
  } catch (error) {
    console.error('✗ GitHub API error:', error);
  }
}

async function runTests() {
  await testLeetCode();
  await testGitHub();
}

runTests();
