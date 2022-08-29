package com.zipedoc.repository;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.zipedoc.service.DocumentService;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class S3Repository {

    private final AmazonS3Client s3Client;
    private final String bucketName = "zcw-cohort8n3dot1";
    private final Logger logger = LoggerFactory.getLogger(DocumentService.class);

    //        credentials = new BasicAWSCredentials(
    //                "<AWS accesskey>",
    //                "<AWS secretkey>"
    //        );

    public S3Repository(AmazonS3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadObject(String key, String data) {
        s3Client.putObject(bucketName, key, new File(data));
        return String.valueOf(s3Client.getUrl(bucketName, key));
    }

    public List<S3ObjectSummary> listObjects() {
        return new ArrayList<>(s3Client.listObjectsV2(bucketName).getObjectSummaries());
    }

    public ByteArrayOutputStream downloadFile(String keyName) {
        try {
            S3Object s3object = s3Client.getObject(new GetObjectRequest(bucketName, keyName));

            InputStream is = s3object.getObjectContent();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            int len;
            byte[] buffer = new byte[4096];
            while ((len = is.read(buffer, 0, buffer.length)) != -1) {
                outputStream.write(buffer, 0, len);
            }

            return outputStream;
        } catch (IOException ioException) {
            logger.error("IOException: " + ioException.getMessage());
        } catch (AmazonServiceException serviceException) {
            logger.info("AmazonServiceException Message:    " + serviceException.getMessage());
            throw serviceException;
        } catch (AmazonClientException clientException) {
            logger.info("AmazonClientException Message: " + clientException.getMessage());
            throw clientException;
        }

        return null;
    }
    //
    //    //downloading an object
    //    S3Object s3object = awsService.getObject(bucketName, "JavaTools/hello.txt");
    //    S3ObjectInputStream inputStream = s3object.getObjectContent();
    //        FileUtils.copyInputStreamToFile(inputStream, new File("/Users/user/Desktop/hello.txt"));
}
