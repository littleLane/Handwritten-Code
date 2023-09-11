import dns from "dns";

function dnsLookup(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address, family) => {
      if (err) {
        reject(err);
      } else {
        resolve(address);
      }
    });
  });
}

const domain = "www.baidu.com";
dnsLookup(domain).then(console.log).catch(console.error);
